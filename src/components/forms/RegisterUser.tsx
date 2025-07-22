"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { userInfoSchema, UserInfoSchema } from "@/schemas/registerUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowBigRight } from "lucide-react";
import { useUserSignup } from "@/contexts/UserCredentials/UserSignUpContext";
import { searchCompanyName } from "@/actions/companySearch";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

export interface CompanyDetails {
  title: string;
  address_snippet: string;
  company_number: string;
}

export interface CompanyResponseData {
  items: CompanyDetails[];
}

export default function RegisterUser() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanyDetails[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const { setUserCredentials } = useUserSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(userInfoSchema),
  });

  const router = useRouter();

  const searchName = async () => {
    try {
      const data = await searchCompanyName(searchTerm);
      if (data?.items) {
        setSearchResults([...data.items]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<UserInfoSchema> = async (data) => {
    if (Object.keys(errors).length > 0) {
      console.log("There are errors in the form");
      return;
    }
    setUserCredentials({
      ...data,
      email: data.email.toLowerCase(),
      terms_and_conditions: "true",
    });

    clearErrors();
    setSubmitError(null);

    // You can store this in context or navigate with data
    console.log("Form Data:", data);

    // router.push("/signup-password");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-center flex flex-col items-center justify-center relative"
      >
        {/* company name*/}
        <input
          type="text"
          // {...register("given_name")}
          placeholder="Search company name"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className={cn(
            "w-2/4 p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200",
            errors.given_name
              ? "bg-red-100"
              : "focus:shadow-md focus:border-blue-400"
          )}
        />
        <button
          type="button"
          className="absolute top-5 right-42 md:right-52 lg:right-58 mb-4  cursor-pointer"
        >
          <ArrowBigRight
            color="#00b1c4"
            className=" size-7 lg:size-8 hover: bg-lbgray"
            onClick={searchName}
          />
        </button>
        <p className="w-2/4 text-xs text-lbgreen text-left align-start pb-2">
          * Click the arrow to find your company
        </p>

        {/* {errors.given_name && (
        <p className="text-red-500 text-sm">{errors.given_name.message}</p>
      )} */}
        {/* First Name */}
        <input
          type="text"
          {...register("given_name")}
          placeholder="First name"
          className={cn(
            "w-2/4 p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200",
            errors.given_name
              ? "bg-red-100"
              : "focus:shadow-md focus:border-blue-400"
          )}
        />
        {errors.given_name && (
          <p className="text-red-500 text-sm">{errors.given_name.message}</p>
        )}

        {/* Last Name */}
        <input
          type="text"
          {...register("family_name")}
          placeholder="Last name"
          className={cn(
            "w-2/4 p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200",
            errors.family_name
              ? "bg-red-100"
              : "focus:shadow-md focus:border-blue-400"
          )}
        />
        {errors.family_name && (
          <p className="text-red-500 text-sm">{errors.family_name.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          {...register("email")}
          placeholder="Email address"
          className={cn(
            "w-2/4 p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200",
            errors.email
              ? "bg-red-100"
              : "focus:shadow-md focus:border-blue-400"
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Phone Number */}
        <input
          type="tel"
          {...register("phoneNumber")}
          placeholder="Phone number"
          className={cn(
            "w-2/4 p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200",
            errors.phoneNumber
              ? "bg-red-100"
              : "focus:shadow-md focus:border-blue-400"
          )}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}

        {/* Terms and Conditions */}
        <label className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            value="true"
            {...register("terms_and_conditions")}
          />
          <span className="text-sm text-gray-700">
            I agree to the Terms and Conditions
          </span>
        </label>
        {errors.terms_and_conditions && (
          <p className="text-red-500 text-sm mt-1">
            {errors.terms_and_conditions.message}
          </p>
        )}

        {/* Submit */}
        <input
          type="submit"
          value="Continue"
          className="w-2/4 p-3 shadow-lg rounded-lg my-6 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
        />

        {submitError && (
          <p className="text-red-500 text-sm mt-2">{submitError}</p>
        )}
      </form>
      <div className="min-h-[120px] max-h-[150px] w-2/4  ">
        {!!searchResults.length && (
          <div className="min-h-[120px] max-h-[150px]  border-dashed border-2 border-lbdarkblue rounded-md p-4 mx-auto scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen overflow-y-auto">
            {searchResults.map((result) => {
              return (
                <div
                  className="border-b border-lbtextgrey cursor-pointer py-2 px-2 hover:bg-lbblue focus:bg-lbtext focus:text-white"
                  key={result.address_snippet}
                  onClick={() => setSelectedCompany(result.title)}
                >
                  <div className="flex flex-row justify-start items-center gap-2 font-semibold">
                    <Building2 size={18} color="#00b1c4" />
                    <p className="text-base">{result.title}</p>
                  </div>
                  <p className="text-sm">{result.address_snippet}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
