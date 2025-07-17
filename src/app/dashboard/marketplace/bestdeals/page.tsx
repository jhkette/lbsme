"use client";
import React from "react";
import { useGetAllDealsQuery } from "@/graphql/getAllDeals.generated";
import Image from "next/image";

import DealCategory from "@/components/deals/DealCategory";


export default function Page() {

  const { loading, error, data, refetch } = useGetAllDealsQuery({
  errorPolicy: "all",

  fetchPolicy: "cache-and-network",
});
  type Deal = {
    // Add other properties as needed based on your deal structure
    [key: string]: any;
  };

  const finalData = data?.getAllDeals.map((deal) => {
    return deal.category;
  });
  console.log(finalData);
  return (
    <div className="px-16 w-full flex flex-col mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Best Deals</h1>
      <Image
        src="/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-6 z-0 right-40"
      />
      <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-12">
        <div className="w-full bg-lbgray rounded-t-lg p-2">
          <h2 className="text-xl font-semibold text-lbtext">Best Deals</h2>
        </div>
        <div className="scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen overflow-x-auto flex flex-row py-4 rounded-b-lg  bg-white justify-around items-end w-full flex-wrap max-h-[450px] ">
          {finalData?.map((category: string) => {
            return <DealCategory key={category} category={category} />;
          })}
        </div>
      </section>
    </div>
  );
}
