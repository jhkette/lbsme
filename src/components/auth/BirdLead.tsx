import React from "react";
import Image from "next/image";
export default function BirdLead() {
	return (
		<div
			className="flex flex-col  items-center justify-center h-screen w-1/2 pt-16 
    bg-lbblue 
    "
		>
			<div className="text-center">
				<Image
					src="/images/main/largebird.svg"
					alt="Bird"
					width={410}
					height={410}
					className="mx-12 w-[330px] md:w-[370px] h-auto object-contain"
				/>
			</div>
			<h1 className="text-2xl/10 lg:text-4xl/12 font-bold text-lbtext mb-4 px-12  text-center w-[85%] ">
				Subscriptions managed, Money Saved, Life Simplified
			</h1>

			<h2 className="text-lg/6 lg:text-xl/8 font-bold text-lbtext opacity-90 mb-4 px-12  text-center w-[70%]">
				View, Analyse, Switch or Cancel all your business subscriptions in one
				place saving you time and money
			</h2>
		</div>
	);
}
