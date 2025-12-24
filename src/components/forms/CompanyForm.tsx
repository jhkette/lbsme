"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Search } from "lucide-react";
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
	const [formError, setFormError] = useState<string>("");
	const [selectedCompany, setSelectedCompany] = useState<CompanyDetails | null>(
		null,
	);

	const { setUserCredentials, userCredentials, isLoading } = useUserSignup();

	const router = useRouter();

	// return to register if there
	// is no userCredentials from prior form
	useEffect(() => {
		if (!isLoading && !userCredentials?.email) {
			router.push("/register-user");
		}
	});

	const searchName = async () => {
		try {
			setSelectedCompany(null);
			const data = await searchCompanyName(searchTerm);
			if (data?.items) {
				setSearchResults([...data.items]);
			}
		} catch (err) {
			setFormError(
				`There was an error ${err instanceof Error && err.message ? err.message : ""}`,
			);
			console.log(err);
		}
	};

	const setCompanyTerm = (value: string) => {
		console.log(value);
		setSelectedCompany(null);
		setSearchTerm(value);
	};

	const onSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();
		if (
			!selectedCompany?.title ||
			!selectedCompany?.address_snippet ||
			!selectedCompany?.company_number
		) {
			console.log("There are errors in the form");
			setFormError(
				"Please search for your company and select a company from the list .",
			);
			return;
		}

		setUserCredentials({
			given_name: userCredentials?.given_name || "",
			family_name: userCredentials?.family_name || "",
			email: userCredentials?.email || "",
			terms_and_conditions: userCredentials?.terms_and_conditions || "",
			phoneNumber: userCredentials?.phoneNumber || "",
			companyDetails: {
				title: selectedCompany?.title,
				address_snippet: selectedCompany?.address_snippet,
				company_number: selectedCompany?.company_number,
			},
		});

		setFormError("");

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
					<div className="w-full flex justify-start items-center">
						<input
							type="text"
							id="companyName"
							placeholder="Search company name"
							onChange={(e) => setCompanyTerm(e.target.value)}
							className="w-4/4 p-3 rounded-lg mt-4 mb-2 text-lg border border-gray-300 outline-none transition-all duration-200 focus:shadow-md focus:border-blue-400"
							value={
								selectedCompany !== null ? selectedCompany.title : searchTerm
							}
						/>
						<div className="w-18 ml-6 mt-3">
							<button
								type="button"
								onClick={searchName}
								className="w-full flex flex-col justify-center items-center px-3 py-4 shadow-lg rounded-lg mt-2 mb-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
							>
								<Search size={18} className="inline" />
							</button>
						</div>
					</div>
					{!!formError.length && (
						<p className="text-red-500 text-sm">{formError} </p>
					)}
				</div>
				<div className="min-h-[290px] w-full flex flex-col items-center justify-center">
					{!!searchResults.length && (
						<div className="w-3/5 align start ">
							<h2 className="text-lbtext text-lg font-semibold pb-2 text-left">
								Select your company details from the list below:
							</h2>

							<div className="max-h-[180px] border border-gray-300 rounded-lg px-4 py-6 mx-auto scrollbar-nice overflow-y-auto mb-4">
								{searchResults.map((result) => {
									const isSelected =
										selectedCompany?.company_number === result.company_number &&
										selectedCompany?.title === result.title;
									return (
										<div
											className={cn(
												"border border-lbtextgrey rounded-md cursor-pointer py-3 px-3 mb-2 min-h-[44px] transition-colors duration-200",
												isSelected
													? "bg-lbgreen text-white"
													: "hover:bg-lbblue hover:text-lbtextdark",
											)}
											key={`${result.company_number}-${result.title}`}
											onClick={() => setSelectedCompany(result)}
										>
											<div className="flex flex-row justify-start items-center gap-2 font-semibold">
												<Building2
													size={18}
													color={isSelected ? "#ffffff" : "#00b1c4"}
												/>
												<p className="text-base text-left">{result.title}</p>
											</div>
											<p className="text-sm text-left">
												{result.address_snippet}
											</p>
										</div>
									);
								})}
							</div>
							<div className="w-full flex justify-start">
								<input
									type="submit"
									value="Select your company"
									className="w-fit p-3 shadow-lg rounded-lg my-2 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
								/>
							</div>
						</div>
					)}
				</div>
			</form>
		</>
	);
}
