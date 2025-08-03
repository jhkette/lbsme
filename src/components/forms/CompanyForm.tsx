"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



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

export default function RegisterCompany() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanyDetails[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<CompanyDetails | null>(
    null
  );

  const { setUserCredentials, userCredentials } = useUserSignup();

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

  const setCompanyTerm = (value: string) => {
    setSelectedCompany(null);
    setSearchTerm(value);
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

 

  interface UserCredentials {
    given_name: string;
    family_name: string;
    email: string;
    terms_and_conditions: string;
    phoneNumber: string;
    companyDetails: CompanyDetails;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (
      !selectedCompany?.title ||
      !selectedCompany?.address_snippet ||
      !selectedCompany?.company_number
    ) {
      console.log("There are errors in the form");
      return;
    }
    setUserCredentials({
      given_name: userCredentials?.given_name || "",
      family_name: userCredentials?.family_name || "",
      email: userCredentials?.email || "",
      terms_and_conditions: userCredentials?.terms_and_conditions || "",
      phoneNumber: userCredentials?.phoneNumber || "",
      companyDetails: {
        title: selectedCompany?.title || "",
        address_snippet: selectedCompany?.address_snippet || "",
        company_number: selectedCompany?.company_number || "",
      },
    });

    console.log("user credentials", userCredentials);

    setSubmitError(null);

    router.push("/register-password");
  };

  return (
    <>
      <form
        className="w-full text-center flex flex-col items-center justify-center relative"
        onSubmit={onSubmit}
      >
        {/* company name*/}
        <div className="w-2/4 flex flex-col">
          <label
            htmlFor="companyName"
            className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
          >
            Company name
          </label>
          <input
            type="text"
            id="companyName"
            // {...register("given_name")}
            placeholder="Search company name"
            onChange={(e) => setCompanyTerm(e.target.value)}
            className= "w-full p-3 rounded-lg my-4 text-lg border border-gray-300 outline-none transition-all duration-200 focus:shadow-md focus:border-blue-400"
            value={
              selectedCompany !== null ? selectedCompany.title : searchTerm
            }
          />
          <button
            type="button"
            className="absolute top-12 lg:top-11 right-54 lg:right-44  lg:right-58 mb-4 cursor-pointer group"
            onClick={searchName}
          >
            <ArrowBigRight className="size-8 lg:size-9 text-lbgreen group-hover:text-lbtextgrey transition-colors duration-200" />
          </button>

          <p className="w-full text-base font-semibold text-lbgreen text-left align-start pb-2">
            * Click the arrow to find your company
          </p>
        <input
          type="submit"
          value="Continue"
          className="w-2/4 p-3 shadow-lg rounded-lg my-6 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
        />
       

        {submitError && (
          <p className="text-red-500 text-sm mt-2">{submitError}</p>
        )}
        </div>
      </form>
      <div className="min-h-[240px] w-full flex flex-col items-center justify-center">
        {!!searchResults.length && (
          <div className="w-2/4  ">
            <h2 className="text-lbtext text-lg font-semibold pb-2 text-left">
              Select your company details from the list below:
            </h2>
            <div className="h-[220px] border-1 border-gray-300 p-4 mx-auto scrollbar-nice overflow-y-auto mb-4">
              {searchResults.map((result) => {
                return (
                  <div
                    className={cn(
                      "border-b border-lbtextgrey text-lbtextdark cursor-pointer py-2 px-2 hover:bg-lbblue hover:text-lbtextdark",
                      selectedCompany?.title === result.title &&
                        "bg-lbgreen text-white"
                    )}
                    key={result.title}
                    onClick={() => setSelectedCompany(result)}
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
      </div>
    </>
  );
}
