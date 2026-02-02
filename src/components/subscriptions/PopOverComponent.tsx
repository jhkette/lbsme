"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { costSchema } from "@/schemas/costSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Search, X } from "lucide-react";
import { addDays } from "date-fns";
import {
  useGetMerchantLazyQuery,
} from "@/graphql/getMerchants.generated";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import DatePickerComponent from "./DatePickerComponent";
import { useBlur } from "@/contexts/BlurContext/BlurContext";
import { SaveSubscriptionInput } from "@/graphql-types/generated/types";
import { useSaveSubscriptionMutation } from "@/graphql/saveSubscription.generated";
import { SubscriptionPriceTypeEnum } from "@/interfaces/PriceTypeEnum";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { MerchantResultV2 } from "@/graphql-types/generated/types";

interface SubscriptionFormData {
  provider?: string;
  category?: string;
  cost: string;
  frequency: SubscriptionPriceTypeEnum;
}

export function PopoverComponent() {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState("");
    const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [contractEndPayment, setContractEndPayment] = useState<Date | null>(
    null,
  );
  const [nextPayment, setNextPayment] = useState<Date | null>(null);
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const minDate = useMemo(() => addDays(new Date(), 1), []);
  const [saveSubscription] = useSaveSubscriptionMutation();
  const [subSubmitting, setSubSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [selectedMerchant, setSelectedMerchant] =
    useState<MerchantResultV2 | null>(null);
  const { isBlurred, setIsBlurred } = useBlur();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SubscriptionFormData>({
    defaultValues: {
      provider: selectedMerchant?.name ?? "",
      category: selectedMerchant?.subCategory ?? "",
      cost: "",
      frequency: SubscriptionPriceTypeEnum.Monthly,
    },
    resolver: zodResolver(costSchema),
  });

  useEffect(() => {
    if (selectedMerchant) {
      setValue("provider", selectedMerchant.name);

      // Handle subCategory - sometimes it's a proper string, sometimes it's a malformed string like "{SK=SUBCATEGORY#OTHER...}"
      let categoryValue = "Other";
      if (selectedMerchant.subCategory) {
        const subCat = selectedMerchant.subCategory;
        // Check if it's a malformed string containing "SK=" or "SUBCATEGORY#"
        if (
          subCat.includes("SK=") ||
          subCat.includes("SUBCATEGORY#") ||
          subCat.includes("PK=")
        ) {
          categoryValue = "Other";
        } else {
          categoryValue = subCat;
        }
      }
      setValue("category", categoryValue);
    }
  }, [selectedMerchant, setValue]);

  const [getMerchant, { data: merchantData, error, loading }] =
    useGetMerchantLazyQuery({
      variables: { filter: filterValue },

      fetchPolicy: "cache-and-network",
    });

 




  useEffect(() => {
    if (open === false) {
      setFilterValue("");
    }
  }, [open]);
  // Handle blur effect when popover is opened or closed
  useEffect(() => {
    setIsBlurred(open);
  }, [open, setIsBlurred]);
  // Fetch merchants when filterValue changes
  useEffect(() => {
    // if (search.length <= 2 && search.length !== 0) return;
    (async () => {
      try {
        await getMerchant({ variables: { filter: filterValue } });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [getMerchant, filterValue]);

  console.log(merchantData?.getMerchant);

  
  // Function to clear form values and reset state
  // when user closes the popover
  const clearValues = () => {
    reset();
    setSelectedMerchant(null);
    setOpen(false);
    setStep(1);
    setFormError(null);
  };

  const onSubmit: SubmitHandler<SubscriptionFormData> = async (data) => {
    console.log("Form submitted with data:", data);
    console.log("Selected Merchant:", selectedMerchant);

    setSubSubmitting(true);
    if (!(nextPayment instanceof Date)) {
      setSubSubmitting(false);
      setFormError("Next payment date is required and must be a valid date.");
      return;
    }
    if (
      !selectedMerchant ||
      !selectedMerchant.category?.PK ||
      !selectedMerchant.SK
    ) {
      setSubSubmitting(false);
      setFormError("Please select a valid merchant before submitting.");
      return;
    }
    const saveSubscriptionData: SaveSubscriptionInput = {
      category: {
        PK: selectedMerchant.category.PK,
        SK: selectedMerchant.SK,
      },
      merchant: {
        id: selectedMerchant.id,
        name: selectedMerchant.name,
      },
      amount: parseFloat(data.cost),
      type: data.frequency,
      freeTrial: isFreeTrial,
      displayName: selectedMerchant.name ?? "",
      renewalDate:
        nextPayment instanceof Date ? format(nextPayment, "yyyy-MM-dd") : null,

      contractEndDate:
        contractEndPayment instanceof Date
          ? format(contractEndPayment, "yyyy-MM-dd")
          : null,
    };
   console.log("Prepared saveSubscriptionData:", saveSubscriptionData);


    try {
      const result = await saveSubscription({
        variables: { subscription: saveSubscriptionData },
      });

      if (result.data) {
        const savedId = result.data.saveSubscription.id;
        if (savedId) {
          router.push(`/dashboard/subs/${encodeURIComponent(savedId)}`);
        }
      }
    } catch (e: unknown) {
      setSubSubmitting(false);
      console.log("Unexpected error saving subscription:", e);
      const errorMessage =
        e instanceof Error ? e.message : "An unexpected error occurred.";
      setFormError(errorMessage);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-40  border-1 border-lbgray text-white bg-lbbgblue rounded-md  py-2 cursor-pointer">
          Add subscription +
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-148 relative -top-56 -left-[500px] z-400 shadow-md bg-white">
        <div className="flex flex-row items-center px-8 my-2 bg-white">
          <h2 className="text-2xl font-semibold pb-2 text-lbtext">
            Add a subscription
          </h2>
          <div className="ml-auto cursor-pointer">
            <X
              className="text-lbtext hover:text-lbgreen"
              size={32}
              onClick={() => {
                clearValues();
              }}
            />
          </div>
        </div>
        {step === 1 && (
          <div className="px-12 ">
            <div className="w-full flex justify-start items-center relative">
              <input
                type="text"
                id="companyName"
                placeholder="Search company name"
                onChange={(e) => setFilterValue(e.target.value)}
                className="w-4/4 p-2  rounded-lg my-4 text-lg border border-gray-300 outline-none transition-all duration-200 focus:shadow-md focus:border-blue-400"
              />
              <Search
                color="#cfceceff"
                size={26}
                className="absolute right-8 top-6 "
              />
            </div>
            <div className=" h-[450px] lg:h-[550px] overflow-y-auto scrollbar-nice">
              {merchantData?.getMerchant?.map((item, index) => {
                return (
                  <p
                    className={cn(
                      index % 2 == 0 ? "bg-lblightblue" : "bg-white",
                      "px-4 py-2 text-lg cursor-pointer hover:bg-lbgray",
                    )}
                    onClick={() => {
                      setSelectedMerchant(item as MerchantResultV2);
                      setStep(2);
                    }}
                    key={item.id}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-2">
            <div
              className="px-16 py-4 flex flex-row items-center cursor-pointer text-lbgreen font-semibold"
              onClick={() => setStep(1)}
            >
              <ArrowLeft onClick={() => setStep(1)} /> Go back
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full text-center flex flex-col items-center justify-center relative"
            >
              {/* Provider */}
              <div className="w-3/4 flex flex-col">
                <label
                  htmlFor="provider"
                  className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
                >
                  Provider
                </label>
                <input
                  type="text"
                  id="provider"
                  placeholder="Provider name"
                  {...register("provider")}
                  className="w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200"
                />
                {errors.provider && (
                  <p className="text-red-500 text-sm">
                    {errors.provider.message}
                  </p>
                )}
              </div>
              {/* Category */}
              <div className="w-3/4 flex flex-col">
                <label
                  htmlFor="category"
                  className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
                >
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Category"
                  id="category"
                  {...register("category")}
                  className="w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Cost + Frequency */}
              <div className="w-3/4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="cost"
                    className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
                  >
                    Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-500">
                      £
                    </span>
                    <input
                      type="text"
                      id="cost"
                      placeholder="0.00"
                      inputMode="decimal"
                      {...register("cost", {
                        required: "Cost is required",
                      })}
                      className="w-full p-3 pl-8 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200"
                    />
                  </div>
                  {errors.cost && (
                    <p className="text-red-500 text-sm">
                      {errors.cost.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="frequency"
                    className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
                  >
                    Frequency
                  </label>
                  <select
                    id="frequency"
                    {...register("frequency", {
                      required: "Frequency is required",
                    })}
                    className="w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200 bg-white"
                  >
                    <option value={SubscriptionPriceTypeEnum.Monthly}>
                      Monthly
                    </option>
                    <option value={SubscriptionPriceTypeEnum.Quarterly}>
                      Quarterly
                    </option>
                    <option value={SubscriptionPriceTypeEnum.Weekly}>
                      Weekly
                    </option>
                    <option value={SubscriptionPriceTypeEnum.Yearly}>
                      Yearly
                    </option>
                  </select>
                  {errors.frequency && (
                    <p className="text-red-500 text-sm">
                      {errors.frequency.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="w-3/4 flex flex-row items-center justify-start border-red-500">
                <div className="w-2/4 mr-3 flex flex-col">
                  <label className="text-sm w-full text-lbgreen font-semibold text-left align-start w-fit">
                    Next Payment Date
                  </label>
                  <DatePickerComponent onDateChange={setNextPayment} />
                </div>
                <div className="w-2/4 ml-3 flex flex-col">
                  <label className="text-sm w-full text-lbgreen font-semibold text-left align-start w-fit">
                    Contract End Date (optional)
                  </label>
                  <DatePickerComponent onDateChange={setContractEndPayment} />
                </div>
              </div>

              <div className="w-3/4 flex items-center justify-between py-2">
                <label className="text-sm text-lbgreen font-semibold">
                  Free trial
                </label>
                <Switch
                  checked={isFreeTrial}
                  onCheckedChange={(checked) => setIsFreeTrial(checked)}
                />
              </div>
              {/* Submit */}
              <input
                type="submit"
                value="Add Subscription"
                className="w-3/4 p-3 shadow-lg rounded-lg my-6 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
              />
              {subSubmitting &&
                <LoaderCircle className="size-10  text-lbgreen animate-spin" />
             }
              {formError && (
                <p className="text-red-500 text-sm">
                  {formError}
                </p>
              )}
            </form>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
