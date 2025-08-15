"use client";
import React, { useEffect } from "react";
import { useGetProviderlessUserAuthGatewayLazyQuery } from "@/graphql/getOpenBanking.generated";

import ConnectAccounts from "@/components/connectedAccounts/connectAccounts";

import Image from "next/image";

import { SubscriptionsBankConnection } from "@/components/suspense/SuspenseComponents";


import { NetworkStatus } from "@apollo/client";
// this page could be broken down into smaller components for better readability and maintainability
export default function Page() {

 

  const [fetchUrl, { data, loading: queryLoading, error }] =
    useGetProviderlessUserAuthGatewayLazyQuery({
      fetchPolicy: "network-only", // always get fresh data
    });

  const url = data?.getProviderlessUserAuthGateway?.url;

  // Fetch as soon as the page mounts — don’t wait for subscribed to finish
  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);

  return (
    <div className="px-16 w-full mt-14 relative">
      <h1 className="text-4xl font-semibold text-lbtext pt-2">
        Connected Bank Accounts
      </h1>
      <Image
        src="/images/main/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute -top-2 z-0 right-40 "
      />

      <div className="my-16 mt-21">
        {queryLoading || !url ? (
          <SubscriptionsBankConnection />
        ) : (
          <ConnectAccounts  url={url as string} />
        )}
      </div>
    </div>
  );
}
