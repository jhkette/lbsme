"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext/UserProvider";
import { useOBContext } from "@/contexts/OpenBanking/OpenBankingProvider";
import { useGetBankAccountQuery } from "@/graphql/getBankAccount.generated";

import { OpenBankingPopUp } from "@/components/lbcoreui/OpenBankingPopUp";
import { useSubscriptionStatus } from "@/contexts/SubscribedContext/SubscriptionStatusContext";
export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { openOBPage } = useOBContext();

  const connectAccount = () => {
    // setModalVisible(false);
    openOBPage();
  };

  const { subscribed, loading: subLoading } = useSubscriptionStatus();

  const navigateDashboard = () => {
    router.push("/dashboard");
  };
  const { loading, error, data, refetch } = useGetBankAccountQuery({
    errorPolicy: "all",

    fetchPolicy: "cache-and-network",
  });

  const accounts = data?.getBankAccount || [];

  const accountInfoList = accounts.map(({ status, lastSynced, provider }) => ({
    status,
    lastSynced,
    provider: {
      displayName: provider.displayName,
      icon: provider.icon,
    },
  }));

  console.log(data, "data from getBankAccount", subscribed);

  return (
    <div className="px-16 w-full mt-14 relative">
      <h1 className="text-4xl font-semibold text-lbtext">
        Connected Bank Accounts
      </h1>
      <div className="my-16 flex flex-row gap-12">
        <div className="w-1/2 p-4 rounded-2xl shadow-2xl bg-white h-120 border-1 border-gray-300"></div>
        <div className=" w-1/2  py-4 rounded-2xl shadow-2xl bg-white max-h-120 border-1 border-gray-300 ">
          <div>
            <OpenBankingPopUp
              connectAccount={connectAccount}
              navigateDashboard={navigateDashboard}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
