"use client";
import React, {useEffect} from "react";
import { useGetTrialsQuery } from "@/graphql/getTrials.generated";
import Image from "next/image";
import { useGetAllDealsQuery } from "@/graphql/getAllDeals.generated";
import DealCategory from "@/components/deals/DealCategory";
import FreeTrialItem from "@/components/deals/FreeTrialItem";
import {SuspenseDeals} from "@/components/suspense/SuspenseComponents";

type Deal = {
  // Add other properties as needed based on your deal structure
  [key: string]: any;
};
<div className="w-full bg-lbgray rounded-t-lg p-2"></div>;

export default function Page() {
  // stops odd scroll behavior on page change
  // this is a workaround for the issue where the page scrolls to the bottom on initial load
  // it locks the scroll position to the top of the page
  useEffect(() => {
  window.scrollTo(0, 0); // Lock to top
}, []);
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
  console.log(finalData, "final trials data")

  const finalDealsData = dealData?.getAllDeals.map((deal) => {
    return deal.category;
  });

  return (
    <div className="px-16 w-full flex flex-col mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Marketplace</h1>
      <Image
        src="/images/main/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-6 z-0 right-40"
      />
     {loading ? (<SuspenseDeals />) : (
      <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-4">
        <div className="w-full bg-lbgray rounded-t-lg p-4">
          <h2 className="text-2xl font-semibold text-lbtext">Free Trials</h2>
        </div>
        <div className="overflow-x-auto flex flex-row py-4 px-12 rounded-b-lg  bg-white justify-start items-center w-full flex-wrap h-[455px] scrollbar-nice "> 
        
          {finalData?.map((deal: Deal) => {
            return <FreeTrialItem key={deal.name} deal={deal} />;
          })}
        </div>
      </section>
        )}
   {dealLoading ? (<SuspenseDeals />) : (
      <section className=" flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-12">
        <div className="w-full bg-lbgray rounded-t-lg p-4">
          <h1 className="text-2xl font-semibold text-lbtext">Best Deals</h1>
        </div>
        <div className="overflow-x-auto flex flex-row py-4 px-12 rounded-b-lg  bg-white justify-start items-center w-full flex-wrap h-[455px] scollbar-nice ">
          {finalDealsData?.map((category: string) => {
            return <DealCategory key={category} category={category} />;
          })}
        </div>
      </section>
   )}
    
    </div>
  );
}
