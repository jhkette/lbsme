"use client";
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
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
import { set } from "date-fns";

interface MerchantResultV2 {
  __typename: "MerchantResultV2";
  SK: string;
  id: string;
  name: string;
  subCategory: string;
  category: string | null;
}

interface SubscriptionFormData {
  provider: string;
  category: string;
  email: string;
  phoneNumber: string;
  termsAccepted: boolean;
}

export function PopoverComponent() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedMerchant, setSelectedMerchant] =
    useState<MerchantResultV2 | null>(null);

  console.log(selectedMerchant, "selectedMerchant");

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
      email: "",
      phoneNumber: "",
      termsAccepted: false,
    },
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

  const { isBlurred, setIsBlurred } = useBlur();

  useEffect(() => {
    if (open === false) {
      setFilterValue("");
    }
  }, [open]);

  useEffect(() => {
    setIsBlurred(open);
  }, [open, setIsBlurred]);

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

  const setNextPayment = (date: Date) => {
    console.log("Selected next payment date:", date);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-40  border-1 border-lbgray text-white bg-lbbgblue rounded-md  py-2 cursor-pointer">
          Add subscription +
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-160 relative -top-48 -left-[500px] z-400 shadow-md">
        <div className="flex flex-row items-center px-8 my-2 bg-white">
          <h2 className="text-2xl font-semibold pb-2 text-lbtext">
            Add a subscription
          </h2>
          <div className="ml-auto cursor-pointer">
            <X
              className="text-lbtext hover:text-lbgreen"
              size={32}
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
        {step === 1 && (
          <div className="px-8">
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
              className="px-18 py-4 flex flex-row items-center cursor-pointer text-lbgreen font-semibold"
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

              {/* Email */}
              <div className="w-3/4 flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Company email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="w-3/4 flex flex-row items-center justify-start border-red-500">
                <div className="w-1/3 mr-8">
                  <DatePickerComponent  setNextPayment={setNextPayment}/>
                </div>
                <div className="w-1/3">
                  <DatePickerComponent setNextPayment={setNextPayment}/>
                </div>
              </div>

              {/* Terms and Conditions */}
              <label className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  {...register("termsAccepted")}
                />
                <span className="text-sm text-gray-700">
                  I accept the terms and conditions
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.termsAccepted.message}
                </p>
              )}

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
