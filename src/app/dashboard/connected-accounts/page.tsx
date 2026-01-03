"use client";
import React, { useEffect, useState } from "react";
import { useGetProviderlessUserAuthGatewayLazyQuery } from "@/graphql/getOpenBanking.generated";

import ConnectAccounts from "@/components/connectedAccounts/connectAccounts";

import Image from "next/image";

import { SubscriptionsBankConnection } from "@/components/suspense/SuspenseComponents";
import { useStatusQuery } from "@/graphql/getSubscribedStatus.generated";
import AccountNotSubscribed from "@/components/accountNotSubscribed/accountNotSubscribed";
// this page could be broken down into smaller components for better readability and maintainability
export default function Page() {
  const { data: subData, loading: subLoading } = useStatusQuery({
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

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
        {subLoading ? (
          <SubscriptionsBankConnection />
        ) : subData?.getSubscribedStatus.subscribed ? (
          <ConnectAccounts
            subscribed={subData.getSubscribedStatus.subscribed}
          />
        ) : (
          <AccountNotSubscribed />
        )}
      </div>
    </div>
  );
}
