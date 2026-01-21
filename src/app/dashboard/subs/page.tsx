"use client";
import SubscriptionMain from "@/components/subscriptions/SubscriptionMain";
import Image from "next/image";

import {useBlur} from "@/contexts/BlurContext/BlurContext";
import {cn} from "@/lib/utils";
export default function page() {
	const { isBlurred } = useBlur();
	return (
	
		<div className={cn("px-16 w-full mt-12 relative", isBlurred && "blur-sm")}>
			<h1 className="font-bold text-4xl mt-14 mb-8 text-lbtext">
				Subscriptions
			</h1>
			<Image
				src="/images/main/lbgraphic.png"
				height={250}
				width={400}
				alt="graphic"
				className=" absolute -top-2 z-0 right-40 "
			/>
			<SubscriptionMain />
		</div>
	
	);
}
