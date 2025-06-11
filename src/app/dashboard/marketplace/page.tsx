import React from "react";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { DealOffer} from "@/sanity/types";
import { DEAL_QUERY } from "@/sanity/queries";
import DealItem from "@/components/deals/DealItem";
export default async function Marketplace() {

  const {data: deals} = await sanityFetch({query: DEAL_QUERY})
  console.log("Deals fetched:", deals);
  return (
    <div className="px-16 w-full flex flex-col mt-12 relative">
      <h1 className="font-bold text-4xl my-8 text-lbtext">Marketplace</h1>
      <Image
        src="/lbgraphic.png"
        height={300}
        width={500}
        alt="graphic"
        className="absolute -top-3 z-0 right-40"
      />

      <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-8">
        <div className="w-full bg-lbgray rounded-t-lg p-2">
          <h2 className="text-xl text-lbtext">Free Trials</h2>
       
        </div>
        <div className="flex flex-row py-12 rounded-b-lg  bg-white justify-between items-end w-full ">
             <DealItem/>
        </div>
      </section>
      <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-8">
        <div className="w-full bg-lbgray rounded-t-lg p-2">
          <h2 className="text-xl text-lbtext">Special Deals & Trials</h2>
        </div>
        <div className="flex flex-row py-12 rounded-b-lg  bg-white justify-between items-end w-full "></div>
      </section>

      <section className="flex flex-col justify-between items-end w-full mt-15 rounded-lg shadow-lg mb-8">
        <div className="w-full bg-lbgray rounded-t-lg p-2">
          <h2 className="text-xl text-lbtext">Switch & Save</h2>
        </div>
        <div className="flex flex-row py-12 rounded-b-lg  bg-white justify-between items-end w-full "></div>
      </section>
    </div>
  );
}
