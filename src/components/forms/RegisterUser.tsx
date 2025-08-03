"use client";

import { useState} from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { userInfoSchema, UserInfoSchema } from "@/schemas/registerUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserSignup } from "@/contexts/UserCredentials/UserSignUpContext";

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
      phoneNumber: "+44",
    },
  });

  const router = useRouter();



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
      companyDetails:{
        title: "",
        address_snippet: "",
        company_number:""

      }
    });

    clearErrors();
    setSubmitError(null);

    router.push("/register-company");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full text-center flex flex-col items-center justify-center relative"
      >
       

       
        {/* First Name */}
        <div className="w-2/4 flex flex-col">
          <label
            htmlFor="firstName"
            className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
          >
            First name
          </label>
          <input
            type="text"
            id="firstName"
            {...register("given_name")}
            placeholder="First name"
            className={cn(
              "w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200",
              errors.given_name
                ? "bg-red-100"
                : "focus:shadow-md focus:border-blue-400"
            )}
          />
          {errors.given_name && (
            <p className="text-red-500 text-sm">{errors.given_name.message}</p>
          )}
        </div>
        {/* Last Name */}
        <div className="w-2/4 flex flex-col">
          <label
            htmlFor="familyName"
            className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
          >
            Family name
          </label>
          <input
            type="text"
            {...register("family_name")}
            placeholder="Last name"
            id="familyName"
            className={cn(
              "w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200",
              errors.family_name
                ? "bg-red-100"
                : "focus:shadow-md focus:border-blue-400"
            )}
          />
          {errors.family_name && (
            <p className="text-red-500 text-sm">{errors.family_name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="w-2/4 flex flex-col">
          <label
            htmlFor="phoneNumber"
            className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
          >
            Email
          </label>
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
          <label
            htmlFor="phoneNumber"
            className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
          >
            Phone number
          </label>
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
            I accept the terms and conditions
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
