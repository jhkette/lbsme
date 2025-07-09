"use client";
import React from 'react'
import { Subscription } from "@/interfaces/Subscription";
import { useGetSubscriptionQuery } from "@/graphql/getSubscriptionDetail.generated";
type SubscriptionDetailProps = {
  idToFetch: string;
};

export default function SubscriptionDetail({ idToFetch }: SubscriptionDetailProps) {


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
    <div>subscriptionDetail</div>
  )
}
