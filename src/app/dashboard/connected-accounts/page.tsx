"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext/UserProvider";
import { useOBContext } from "@/contexts/OpenBanking/OpenBankingProvider";
import { useGetBankAccountQuery } from "@/graphql/getBankAccount.generated";
import Image from "next/image";
import { Landmark } from "lucide-react";

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
      <div className="my-16 flex flex-row gap-12 mt-21 ">
        <div className="w-1/2 p-4 rounded-2xl   shadow-2xl bg-white h-120 border-1 border-gray-300 overflow">
          <div className="flex flex-col items-start justify-start mx-8 pb-1 my-2">
            <h2 className="text-2xl font-semibold text-lbtext my-4">
              Your account details
            </h2>{" "}
            <p className="text-lg">{user?.givenName}{" "}{user?.familyName}</p>
            {accountInfoList.map((account, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-lg font-semibold text-lbtext">
                  {account.provider.icon ? (
                    <Image
                      src={account.provider.icon}
                      alt={account.provider.displayName + " icon"}
                      width={50}
                      height={50}
                    />
                  ) : <Landmark size={50}/>}
                </p>
                <p className="text-lg font-semibold text-lbtext">
                  {account.provider.displayName}
                </p>
                <p className="text-">
                  Status: {account.status}
                </p>
                <p className="text-sm text-gray-500">
                  Last Synced: {account.lastSynced}
                </p>
              </div>
            ))}
          </div>
        </div>
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
