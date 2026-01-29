"use client";
import { useState, useEffect } from "react";
import { costSchema } from "@/schemas/costSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Search, X } from "lucide-react";
import { useMerchantQueryLazyQuery } from "@/graphql/getMerchants.generated";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import DatePickerComponent from "./DatePickerComponent";
import { useBlur } from "@/contexts/BlurContext/BlurContext";
import { useSaveSubscriptionMutation } from "@/graphql/saveSubscription.generated";
import { SubscriptionPriceTypeEnum } from "@/interfaces/PriceTypeEnum"


interface MerchantResultV2 {
  __typename: "MerchantResultV2";
  SK: string;
  id: string;
  name: string;
  subCategory: string;
  category: string | null;
}

interface SubscriptionFormData {
  provider?: string;
  category?: string;
  cost: string;
  frequency: SubscriptionPriceTypeEnum;
}



export function PopoverComponent() {
  const [filterValue, setFilterValue] = useState("");
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
        if (subCat.includes("SK=") || subCat.includes("SUBCATEGORY#") || subCat.includes("PK=")) {
          categoryValue = "Other";
        } else {
          categoryValue = subCat;
        }
      }
      setValue("category", categoryValue);
    }
  }, [selectedMerchant, setValue]);

  const onSubmit = (data: SubscriptionFormData) => {
    console.log("Form Data:", data);
    // Handle form submission here
  };

  const [getMerchant, { data: merchantData, error, loading }] =
    useMerchantQueryLazyQuery({
      variables: { filter: filterValue },

      fetchPolicy: "cache-and-network",
    });
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [contractEndPayment, setContractEndPayment] = useState<Date | null>(null);
  const [nextPayment, setNextPayment] = useState<Date | null>(null);

  

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

  // const setNextPayment = (date: Date) => {
  //   console.log("Selected next payment date:", date);
  // }
  // Function to clear form values and reset state
  // when user closes the popover
  const clearValues = () => {
    reset();
    setSelectedMerchant(null);
    setOpen(false); 
    setStep(1); 
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-40  border-1 border-lbgray text-white bg-lbbgblue rounded-md  py-2 cursor-pointer">
          Add subscription +
        </button>
      </PopoverTrigger>
      <PopoverContent
        className=
          "w-148 relative -top-56 -left-[500px] z-400 shadow-md bg-white"
         
        
      >
        <div className="flex flex-row items-center px-8 my-2 bg-white">
          <h2 className="text-2xl font-semibold pb-2 text-lbtext">
            Add a subscription
          </h2>
          <div className="ml-auto cursor-pointer">
            <X
              className="text-lbtext hover:text-lbgreen"
              size={32}
              onClick={() => { clearValues(); }}
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
              className="px-12 py-4 flex flex-row items-center cursor-pointer text-lbgreen font-semibold"
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
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-500">£</span>
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
                    <p className="text-red-500 text-sm">{errors.cost.message}</p>
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
                    {...register("frequency", { required: "Frequency is required" })}
                    className="w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200 bg-white"
                  >
                    <option value={SubscriptionPriceTypeEnum.Monthly}>Monthly</option>
                    <option value={SubscriptionPriceTypeEnum.Quarterly}>Quarterly</option>
                    <option value={SubscriptionPriceTypeEnum.Weekly}>Weekly</option>
                    <option value={SubscriptionPriceTypeEnum.Yearly}>Yearly</option>
                  </select>
                  {errors.frequency && (
                    <p className="text-red-500 text-sm">{errors.frequency.message}</p>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="w-3/4 flex flex-row items-center justify-start border-red-500">
                <div className="w-2/4 mr-4 flex flex-col">
                  <label className="text-sm w-full text-lbgreen font-semibold text-left align-start w-fit">
                    Next Payment Date
                  </label>
                  <DatePickerComponent onDateChange={setNextPayment} />
                </div>
                <div className="w-2/4 ml-4 flex flex-col">
                  <label className="text-sm w-full text-lbgreen font-semibold text-left align-start w-fit">
                    Contract End Date (optional)
                  </label>
                  <DatePickerComponent onDateChange={setContractEndPayment} />
                </div>
              </div>

             

              {/* Submit */}
              <input
                type="submit"
                value="Continue"
                className="w-3/4 p-3 shadow-lg rounded-lg my-6 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
              />
            </form>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
