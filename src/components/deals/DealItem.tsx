import React from "react";
import { DealOffer } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type DealItemProps = {
  deal: DealOffer;
};

export default function DealItem({ deal }: DealItemProps) {
  const url = urlFor(deal.dealImage?.asset?._ref as string)
    .width(200) // Resize to max 80px width
    .fit("max") // Maintain aspect ratio
    .auto("format") // Better optimization
    .url();
  console.log(deal, "deal item individual");
  return (
    <div className="bg-[url(/images/deals/dealbg.png)] w-[275px] h-[185px] bg-center bg-no-repeat bg-cover my-4 mx-4 py-8">
      <p className="text-center text-2xl text-lbtext font-bold">
        {deal.dealName}
      </p>
      <p className="text-lg text-gray-500 font-semibold text-center">
        {deal.dealSnippet}
      </p>
      <Image
        src={url}
        alt={deal.dealName || ""}
        width={60}
        height={60} // This can be an estimate. Real size adjusts automatically
        style={{ height: "auto" }} // Maintain proportions
        className="rounded ml-auto mt-6 mr-2" // Optional styling
      />
    </div>
  );
}
