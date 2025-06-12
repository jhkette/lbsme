import { client } from "@/sanity/lib/client";
import React from "react";
import { QueryParams } from "sanity";
import { DEAL_QUERY } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import "@/styles/dealsslug.css";

type Deal = {
  _id: string;
  // Add other properties as needed based on your deal structure
  [key: string]: any;
};

export default async function page({
  params,
}: {
  params: Promise<QueryParams>;
}) {
  const finalParams = await params;

  const dealItem = await client.fetch(DEAL_QUERY, finalParams);
  console.log(dealItem, "this is deal item");

  const url = urlFor(dealItem.dealImage?.asset?._ref as string)
    .width(400)
    .fit("max") // Maintain aspect ratio
    .auto("format") // Better optimization
    .url();
  return (
    <section className="px-16 w-full flex flex-col mt-12 relative">
      <Link
        href="/dashboard/marketplace"
        className="flex flex-row items-center hover-bg-blue-200 rounded-md w-fit px-4 py-2 hover:bg-blue-100"
      >
        <ArrowLeft size={18} color="#29235C" />{" "}
        <p className="text-lg pl-2 text-lbtext">Go back</p>
      </Link>
      <h1 className="font-bold text-4xl my-8 text-lbtext">
        Deals Marketplace &gt; {dealItem.dealName}
      </h1>
     
      <Image
        src="/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-6 z-0 right-40"
      />
    

      <div className="deals w-full bg-white p-8 rounded-md mt-4">
         <div className="w-[400px] p-4 bg-lblightblue rounded-md">
        <Image
          src={url}
          alt={dealItem.dealName || ""}
          width={150}
          height={110} // This can be an estimate. Real size adjusts automatically
          style={{ height: "auto" }} // Maintain proportions
          className="rounded mr-auto my-6 mr-2" // Optional styling
        />
        </div>
        <p className="font-bold">Details:</p>
        <PortableText value={dealItem.description} />
        {dealItem.link && (
          <button className="flex flex-row justify-around items-center bg-lbtext hover:bg-lbgreen mt-4 py-3 w-64 rounded-md text-white font-semibold cursor-pointer">
            VIEW THE DEAL <ChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}
