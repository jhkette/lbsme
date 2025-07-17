"use client";
import React from "react";
import { useGetTrialsQuery } from "@/graphql/getTrials.generated";
import Image from "next/image";
import { useGetAllDealsQuery } from "@/graphql/getAllDeals.generated";
import DealCategory from "@/components/deals/DealCategory";

import FreeTrialItem from "@/components/deals/FreeTrialItem";

type Deal = {
  // Add other properties as needed based on your deal structure
  [key: string]: any;
};
<div className="w-full bg-lbgray rounded-t-lg p-2"></div>;

export default function Page() {
  const { loading, error, data, refetch } = useGetTrialsQuery({
    errorPolicy: "all",

    fetchPolicy: "cache-and-network",
  });

  const {
    loading: dealLoading,
    error: dealError,
    data: dealData,
  } = useGetAllDealsQuery({
    errorPolicy: "all",

    fetchPolicy: "cache-and-network",
  });

  const finalData = data?.getTrials.items;

  const finalDealsData = dealData?.getAllDeals.map((deal) => {
    return deal.category;
  });

  return (
    <div className="px-16 w-full flex flex-col mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Marketplace</h1>
      <Image
        src="/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-6 z-0 right-40"
      />

      <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-12">
        <div className="w-full bg-lbgray rounded-t-lg p-2">
          <h2 className="text-xl font-semibold text-lbtext">Free Trials</h2>
        </div>
        <div className="scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen overflow-x-auto flex flex-row py-4 rounded-b-lg  bg-white justify-around items-end w-full flex-wrap max-h-[245px] ">
          {/* {subscriptionDeals
                            .filter((deal: Deal) => deal.featured === true)
                            .map((deal: Deal) => (
                              <DealItem key={deal._id} deal={deal} />
                            ))}
                            <DealSubscriptionMore /> */}
          {finalData?.map((deal: Deal) => {
            return <FreeTrialItem key={deal.name} deal={deal} />;
          })}
        </div>
      </section>

      <section className=" flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-12">
        <div className="w-full bg-lbgray rounded-t-lg p-2">
          <h2 className="text-xl font-semibold text-lbtext">Best Deals</h2>
        </div>
        <div className="scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen overflow-x-auto flex flex-row py-4 rounded-b-lg  bg-white justify-around items-end w-full flex-wrap max-h-[450px] ">
          {finalDealsData?.map((category: string) => {
            return <DealCategory key={category} category={category} />;
          })}
        </div>
      </section>
    </div>
  );
}
