"use client";
import React from 'react'
import { useGetTrialsQuery } from '@/graphql/getTrials.generated';
import Image from 'next/image';

import FreeTrialItem from '@/components/deals/FreeTrialItem'

export default function Page() {
 

   const { loading, error, data, refetch } = useGetTrialsQuery({
      errorPolicy: "all",
     
      fetchPolicy: "cache-and-network",
    });
   

    type Deal = {

  // Add other properties as needed based on your deal structure
  [key: string]: any;
};

    const finalData = data?.getTrials.items
  return (
     <div className="px-16 w-full flex flex-col mt-12 relative">
          <h1 className="font-bold text-4xl my-8 text-lbtext">Free Trials</h1>
          <Image
           src="/images/main/lbgraphic.png"
            height={250}
            width={400}
            alt="graphic"
            className="absolute top-6 z-0 right-40"
          />
           <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-12">
                  <div className="w-full bg-lbgray rounded-t-lg p-4">
                    <h2 className="text-2xl font-semibold text-lbtext">Free Trials</h2>
                  </div>
                  <div className="overflow-x-auto flex flex-row py-4 rounded-b-lg  bg-white justify-around items-end w-full flex-wrap max-h-[450px] ">
                    {/* {subscriptionDeals
                    .filter((deal: Deal) => deal.featured === true)
                    .map((deal: Deal) => (
                      <DealItem key={deal._id} deal={deal} />
                    ))}
                    <DealSubscriptionMore /> */}
                    {
                      finalData?.map((deal: Deal) => {
                        return  (
                        <FreeTrialItem key={deal.name} deal={deal}/>
                        )
                      })
                    }
                  </div>
                </section>

    </div>
  )
}
