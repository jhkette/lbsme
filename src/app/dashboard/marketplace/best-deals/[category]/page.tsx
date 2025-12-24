import React from "react";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import "@/styles/dealsslug.css";
import { Params } from "next/dist/server/request/params";
import CategrorySpecificDeals from "@/components/deals/CategorySpecificDeals";
import Image from "next/image";
export default async function page({ params }: { params: Promise<Params> }) {
	const finalParams = await params;

	return (
		<section className="px-16 w-full flex flex-col mt-12 relative">
			<Link
				href="/dashboard/marketplace/best-deals"
				className="flex flex-row items-center hover-bg-blue-200 rounded-md w-fit px-4 py-2 hover:bg-blue-100"
			>
				<ArrowLeft size={18} color="#29235C" />{" "}
				<p className="text-lg pl-2 text-lbtext">Go back to best deals</p>
			</Link>
			<Image
				src="/images/main/lbgraphic.png"
				height={250}
				width={400}
				alt="graphic"
				className="absolute top-6 z-0 right-40"
			/>

			<CategrorySpecificDeals category={finalParams.category as string} />
			{/* <FreeTrialsDetail freeItem={finalParams.slug as string} /> */}
		</section>
	);
}
