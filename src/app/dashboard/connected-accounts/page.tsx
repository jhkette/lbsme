"use client";
import React from "react";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext/UserProvider";
import { useOBContext } from "@/contexts/OpenBanking/OpenBankingProvider";
import { useGetBankAccountQuery } from "@/graphql/getBankAccount.generated";
import Image from "next/image";

import { Landmark } from "lucide-react";
import { SubscriptionsBankConnection } from "@/components/suspense/SuspenseComponents";
import { OpenBankingPopUp } from "@/components/lbcoreui/OpenBankingPopUp";
import { useSubscriptionStatus } from "@/contexts/SubscribedContext/SubscriptionStatusContext";
// this page could be broken down into smaller components for better readability and maintainability
export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const { openOBPage, OBLoading } = useOBContext();

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
      <div className="my-16  mt-21 ">
        {loading ? (
          <SubscriptionsBankConnection />
        ) : (
          <div className="flex flex-row gap-12 rounded-2xl py-8  shadow-2xl bg-white h-fit border-1 border-gray-300">
            <div className="w-1/2 p-4  overflow-x-auto scrollbar-nice">
              <div className="flex flex-col items-start justify-start gap-4 mx-8 pb-1 my-2">
                <h2 className="text-2xl font-semibold text-lbtext">
                  Your account details:
                </h2>{" "}
                <p className="text-lg font-semibold text-lbtext">
                  Name:{" "}
                  <span className="text-lbtextdark font-normal">
                    {user?.givenName} {user?.familyName}
                  </span>
                </p>
                <p className="text-lg font-semibold text-lbtext">
                  Subscribed status:{" "}
                  <span className="text-lbtextdark font-normal">
                    {subscribed ? "Active" : "Inactive"}
                  </span>
                </p>
                {accountInfoList.map((account, index) => (
                  <div key={index} className="flex flex-col gap-7">
                    <p className="text-lg font-semibold text-lbtext">
                      Bank connection status:{" "}
                      <span className="text-lbtextdark font-normal">
                        {account.status}
                      </span>
                    </p>
                    <p className="text-lg font-semibold text-lbtext flex flex-row items-center gap-2 justify-start">
                      Account:{" "}
                      {account.provider.icon ? (
                        <Image
                          src={account.provider.icon}
                          alt={account.provider.displayName + " icon"}
                          width={30}
                          height={30}
                        />
                      ) : (
                        <Landmark size={30} />
                      )}{" "}
                      <span className="text-lbtextdark font-normal">
                        {account.provider.displayName}
                      </span>
                    </p>

                    <p className="text-lg font-semibold text-lbtext">
                      Last Synced:{" "}
                      <span className="text-lbtextdark font-normal">
                        {format(parseISO(account.lastSynced), "do MMM yyyy")}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-1/2  py-4 ">
             
                <div className="flex flex-col items-center justify-center text-lg font-semibold text-lbtext  bg-lbgray rounded-2xl  mx-18 my-6 p-14">
                  <p className="text-center">
                    {" "}
                    {accountInfoList[0]?.status === "Active"
                      ? "Please click add another account to connect another bank account to Little Birdie."
                      : "Please click connect to Open Banking to connect your bank account to Little Birdie."}
                  </p>
                  <div>
                    <OpenBankingPopUp
                      connectAccount={connectAccount}
                      obLoading={OBLoading}
                      navigateDashboard={navigateDashboard}
                      status={accountInfoList[0]?.status}
                    />
                  </div>
                </div>
           
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
