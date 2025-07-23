"use client";

import { useState, useEffect } from "react";
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

  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const { setUserCredentials, userCredentials } = useUserSignup();
  const {
    register,
    handleSubmit,

    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      phoneNumber: "+44"
    }
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

  useEffect(() => {
    if (selectedCompany !== "") {
      setSearchTerm(selectedCompany);
    }
  }, [selectedCompany]);

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
    console.log(userCredentials, "User credentials");

    clearErrors();
    setSubmitError(null);

    console.log("Form Data:", data);

    router.push("/register-password");
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
          value={selectedCompany !== "" ? selectedCompany : searchTerm}
          className={cn(
            "w-2/4 p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200",
            errors.given_name
              ? "bg-red-100"
              : "focus:shadow-md focus:border-blue-400"
          )}
        />
        <button
          type="button"
          className="absolute top-5 right-42 md:right-52 lg:right-58 mb-4 cursor-pointer group"
          onClick={searchName}
        >
          <ArrowBigRight className="size-7 lg:size-8 text-lbgreen group-hover:text-lbtextgrey transition-colors duration-200" />
        </button>

        <p className="w-2/4 text-xs text-lbgreen text-left align-start pb-2">
          * Click the arrow to find your company
        </p>

        {!!searchResults.length && (
          <div className="w-2/4  ">
            <h2 className="text-lbtext text-lg font-semibold pb-2 text-left">
              Select your company from the list below
            </h2>
            <div className="min-h-[120px] max-h-[150px] border-1 border-lbtext p-4 mx-auto scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen overflow-y-auto mb-4">
              {searchResults.map((result) => {
                return (
                  <div
                    className={cn(
                      "border-b border-lbtextgrey text-lbtextdark cursor-pointer py-2 px-2 hover:bg-lbblue hover:text-lbtextdark",
                      selectedCompany === result.title &&
                        "bg-lbgreen text-white"
                    )}
                    key={result.title}
                    onClick={() => setSelectedCompany(result.title)}
                  >
                    <div className="flex flex-row justify-start items-center gap-2 font-semibold">
                      <Building2 size={18} color="#00b1c4" />
                      <p className="text-base text-left">{result.title}</p>
                    </div>
                    <p className="text-sm text-left">
                      {result.address_snippet}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
         <div className="w-2/4 flex flex-col">
         <label htmlFor="phoneNumber" className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit">Email</label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="Email address"
          className={cn(
            "w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200",
            errors.email
              ? "bg-red-100"
              : "focus:shadow-md focus:border-blue-400"
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        </div>

        {/* Phone Number */}
        <div className="w-2/4 flex flex-col">
        <label htmlFor="phoneNumber" className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit">Phone number</label>
        <input
          type="tel"
          id="phoneNumber"
          placeholder="Phone number (no spaces)"
          {...register("phoneNumber")}
          className={`w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200 ${
            errors.phoneNumber
              ? "bg-red-100"
              : "focus:shadow-md focus:border-blue-400"
          }`}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
        </div>

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
    </>
  );
}
