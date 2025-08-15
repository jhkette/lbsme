"use client";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext/UserProvider";

import { useGetBankAccountQuery } from "@/graphql/getBankAccount.generated";

import { Landmark } from "lucide-react";

import { useStatusQuery } from "@/graphql/getSubscribedStatus.generated";
interface ConnectAccountsProps {
  url: string;
}

export default function ConnectAccounts({ url }: ConnectAccountsProps) {
  const { data: subData, loading: subLoading } = useStatusQuery({
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

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

  const { user } = useUser();

  return (
    <>
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
                {subLoading
                  ? "Loading..."
                  : subData?.getSubscribedStatus.subscribed
                  ? "Active"
                  : "Inactive"}
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
          {!subLoading && subData?.getSubscribedStatus.subscribed && (
            <div className="flex flex-col items-center justify-center text-lg font-semibold text-lbtext  bg-lbgray rounded-2xl  mx-18 my-6 p-14">
              <p className="text-center">
                {accountInfoList[0]?.status === "Active"
                  ? "Please click add another account to connect another bank account to Little Birdie."
                  : "Please click connect to Open Banking to connect your bank account to Little Birdie."}
              </p>
              <div>
                <button
                  onClick={() => window.open(url, "_blank")}
                  className="w-fit px-8 py-6 shadow-lg rounded-lg my-4 text-lg bg-lbgreen text-white cursor-pointer hover:bg-lbtext transition duration-300"
                >
                  {accountInfoList[0]?.status === "Active"
                    ? "Add another account"
                    : "Connect to Open Banking"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
