import { client } from "@/sanity/lib/client";
import React from "react";
import { QueryParams } from "sanity";
import { DEAL_QUERY } from "@/sanity/queries";

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
  console.log(finalParams);

  
  const dealItem = await client.fetch(DEAL_QUERY, finalParams)
  console.log(dealItem, "this is deal item")
  return (
    <div>
      page
      {JSON.stringify(finalParams)}
    </div>
  );
}
