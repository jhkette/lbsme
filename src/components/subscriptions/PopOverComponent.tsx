"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"
import Link from "next/link";
import { ArrowLeft, Search, X } from "lucide-react";
import { useMerchantQueryLazyQuery } from "@/graphql/getMerchants.generated";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import DatePickerComponent  from "./DatePickerComponent";
import { useBlur } from "@/contexts/BlurContext/BlurContext";


interface MerchantResultV2 {
	__typename: "MerchantResultV2";
	SK: string;
	id: string;
	name: string;
	subCategory: string;
	category: string | null;
}

export function PopoverComponent() {
	const [filterValue, setFilterValue] = useState("");
	const [selectedMerchant, setSelectedMerchant] =
		useState<MerchantResultV2 | null>(null);

	console.log(selectedMerchant, "selectedMerchant");

	const handleSubmit = () => {};

	const [getMerchant, { data: merchantData, error, loading }] =
		useMerchantQueryLazyQuery({
			variables: { filter: filterValue },

			fetchPolicy: "cache-and-network",
		});
	const [step, setStep] = useState(1);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open === false) {
			setFilterValue("");
		}
	}, [open]);

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

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button className="w-40  border-1 border-lbgray text-white bg-lbbgblue rounded-md  py-2 cursor-pointer">
					Add subscription +
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-172 relative -top-48 -left-32 z-400">
				<div className="flex flex-row items-center px-8 my-2 bg-white">
					<h2 className="text-2xl font-semibold pb-2 border-b-2 border-lbtext">
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
					<div className="">
						<div className=" border-b border-lbgrey w-3/4 text-center mx-auto mt-4">
							<h2 className="font-semibold text-xl text-left ">
								Add a subscription
							</h2>
						</div>
						<div className="grid gap-2">
							<form
								onSubmit={handleSubmit}
								// onSubmit={handleSubmit(onSubmit)}
								className="w-full text-center flex flex-col items-center justify-center relative"
							>
								{/* First Name */}
								<div className="w-3/4 flex flex-col">
									<label
										htmlFor="firstName"
										className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
									>
										Provider
									</label>
									<input
										type="text"
										id="firstName"
										// {...register("given_name")}
										placeholder="First name"
										className="w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200"
									/>
								</div>
								{/* Last Name */}
								<div className="w-3/4 flex flex-col">
									<label
										htmlFor="familyName"
										className="text-sm  w-full text-lbgreen font-semibold text-left align-start w-fit"
									>
										Family name
									</label>
									<input
										type="text"
										placeholder="Last name"
										id="familyName"
										className="w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200"
									/>
									{/* {errors.family_name && (
                      <p className="text-red-500 text-sm">{errors.family_name.message}</p>
                    )}  */}
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
										// {...register("email")}
										placeholder="Company email address"
										className="w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200"
										// errors.email
										//   ? "bg-red-100"
										//   : "focus:shadow-md focus:border-blue-400"
									/>
									{/* {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )} */}
								</div>

								{/* Phone Number */}
								<div className="w-3/4 flex flex-col">
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
										// {...register("phoneNumber")}
										className="w-full p-3 rounded-lg my-2 text-lg border border-gray-300 outline-none transition-all duration-200"
									/>
									{/* {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                    )} */}
								</div>

								{/* Terms and Conditions */}
								<label className="flex items-center gap-2 mt-4">
									<input
										type="checkbox"
										value="true"
										// {...register("terms_and_conditions")}
									/>
									<span className="text-sm text-gray-700">
										I accept the terms and conditions
									</span>
								</label>
								{/* {errors.terms_and_conditions && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.terms_and_conditions.message}
                    </p>
                  )}
           */}
								{/* Submit */}
								<input
									type="submit"
									value="Continue"
									className="w-3/4 p-3 shadow-lg rounded-lg my-6 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
								/>

								{/* {submitError && (
                    <p className="text-red-500 text-sm mt-2">{submitError}</p>
                  )} */}
							</form>
						</div>
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
}
