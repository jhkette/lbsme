"use client";
import React from "react";
import { Subscription } from "@/interfaces/Subscription";
import { ArrowLeft } from "lucide-react";

import { useGetSubscriptionQuery } from "@/graphql/getSubscriptionDetail.generated";
type SubscriptionDetailProps = {
  idToFetch: string;
};

export default function SubscriptionDetail({
  idToFetch,
}: SubscriptionDetailProps) {
  const { loading, error, data, refetch } = useGetSubscriptionQuery({
    variables: { id: idToFetch },
    // Optional: Add error policy
    errorPolicy: "all",
    // Optional: Cache policy
    fetchPolicy: "cache-and-network",
    // Optional: Poll for updates every 30 seconds
    // pollInterval: 30000,
  });
  console.log("DETAILED SUBdata", data);
  return (
    <div>
      <div className="">
        {/* left hand container */}
        
          <div className="flex flex-row pr-2 items-center gap-1 mb-4 cursor-pointer hover:border-b-2 hover:border-lbgrey w-fit">
            <ArrowLeft size={20} />
            <p className="text-lbgrey">Go back to subs</p>
          </div>
          <h1 className="text-3xl font-bold text-lbtext mb-4">
             Subscription &gt;{" "}
  {loading ? (
    <span className="blur-sm  text-gray-400 select-none">
      Loading subscription
    </span>
  ) : (
    data?.getSubscription.displayName
  )}
          </h1>
          <div className="flex flex-row items-center gap-4 mb-4">
          <div className="w-1/2">
          <div className=" flex flex-col gap-2 rounded-lg bg-white shadow-lg p-4 mr-12 mt-14">

          </div>
        </div>
        {/* right hand container */}
        <div className="w-1/2 ">
         <div className=" flex flex-col gap-2 rounded-lg bg-white shadow-lg p-4 mr-12 mt-14">

          </div>

        
        </div>
        </div>
      </div>
    </div>
  );
}
