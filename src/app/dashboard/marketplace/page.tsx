import React from "react";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SUBSCRIPTION_DEAL_QUERY, SWITCH_DEAL_QUERY } from "@/sanity/queries";
import DealItem from "@/components/deals/DealItem";
import DealSubscriptionMore from "@/components/deals/DealSubscriptionMore";
// import DealSubscriptionSwitchMore from "@/components/deals/DealSubscriptionSwitchMore";
import {Deal} from "@/interfaces/SanityTypes"



export default async function Marketplace() {
  const { data: subscriptionDeals } = await sanityFetch({
    query: SUBSCRIPTION_DEAL_QUERY,
  });
  const { data: switchDeals } = await sanityFetch({ query: SWITCH_DEAL_QUERY });


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
          <h2 className="text-xl text-lbtext">Special deals & Free Trials</h2>
        </div>
        <div className="flex flex-row py-4 rounded-b-lg  bg-white justify-start items-end w-full ">
          {subscriptionDeals
          .filter((deal: Deal) => deal.featured === true)
          .map((deal: Deal) => (
            <DealItem key={deal._id} deal={deal} />
          ))}
          <DealSubscriptionMore />
        </div>
      </section>

      <section className="flex flex-col justify-between items-end w-full rounded-lg shadow-lg mb-12">
        <div className="w-full bg-lbgray rounded-t-lg p-2">
          <h2 className="text-xl text-lbtext">Switch & Save</h2>
        </div>
        <div className="flex flex-row py-4 rounded-b-lg  bg-white justify-start items-end w-full ">
          {switchDeals
            .filter((deal: Deal) => deal.featured === true)
            .map((deal: Deal) => (
              <DealItem key={deal._id} deal={deal} />
            ))}
        </div>
      </section>
    </div>
  );
}
