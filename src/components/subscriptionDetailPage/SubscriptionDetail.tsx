"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Repeat } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SuspenseSubscriptionDetail } from "@/components/suspense/SuspenseComponents";
import { format, parseISO,isBefore } from "date-fns";
import { useGetSubscriptionQuery } from "@/graphql/getSubscriptionDetail.generated";
import { useFetchMinnaWebUiMutation } from "@/graphql/minnaMutation.generated";
import { ChevronRight } from 'lucide-react';
import BigCircle from "@/components/lbcoreui/BigCircle";
import Circle from "@/components/lbcoreui/Circle";

type SubscriptionDetailProps = {
  idToFetch: string;
};

export default function SubscriptionDetail({
  idToFetch,
}: SubscriptionDetailProps) {
  const { loading, error, data, refetch } = useGetSubscriptionQuery({
    variables: { id: idToFetch },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });
  const [fetchMinnaWebUI] = useFetchMinnaWebUiMutation();

  useEffect(() => {
    (async () => {
      const { data: minnaData } = await fetchMinnaWebUI({
        variables: { subscriptionId: idToFetch },
      });
      // You can use minnaData here if needed
    })();
  }, [idToFetch, fetchMinnaWebUI]);

  const now = new Date();
  const currentYear = now.getFullYear();
  console.log(data, "data from subscription detail");
 

  const totalThisYear = (data?.getSubscription?.transactions ?? [])
    .filter((tx): tx is NonNullable<typeof tx> => !!tx && !!tx.bookingTime)
    .filter(
      (tx) => new Date(tx.bookingTime as string).getFullYear() === currentYear
    )
    .reduce((sum, tx) => sum + (tx.amount?.amount ?? 0), 0);

  const allTimeTotal = (data?.getSubscription?.transactions ?? [])
    .filter((tx): tx is NonNullable<typeof tx> => !!tx && !!tx.bookingTime)
    .reduce((sum, tx) => sum + (tx.amount?.amount ?? 0), 0);

   


  return (
  
      <>
         {data?.getSubscription.isManual === false && (
        <Image
        src="/images/main/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="hidden md:block absolute top-2 z-0 right-40 "
      />)}
        <Link href="/dashboard/subs">
          <div className="flex flex-row pr-2 items-center gap-1 mb-4 cursor-pointer border-b-2 border-transparent hover:border-lbtext w-fit">
            <ArrowLeft size={20} />
            <p className="text-lbgrey">Go back to subs</p>
          </div>
        </Link>

        <h1 className="relative text-3xl font-bold text-lbtext mb-4 flex flex-row items-center z-500">
          Subscription <ChevronRight className="w-9 h-9 mt-1 text-muted-foreground" />
          {loading ? (
            <span className="blur-sm text-gray-400 italic select-none">
  Loading subscription...
</span>
          ) : data?.getSubscription.displayName ? (
            data.getSubscription.displayName
          ) : (
            data?.getSubscription.merchant?.name
          )}
        </h1>

        <div className="flex flex-row items-start gap-4 mb-4">
          {/* Left Container */}
          {loading ? (
            <SuspenseSubscriptionDetail />
          ) : (
            <div className="w-1/2">
              <div className="flex flex-col gap-2 rounded-lg bg-white shadow-lg py-4 px-10 mr-12 mt-13 border-1 border-gray-300">
                {/* Intro */}
                <div className="flex flex-row items-center gap-4 mx-auto  mt-12">
                  <div className="flex flex-col items-center">
                    {data?.getSubscription.costs.monthly && (
                      <>
                        <p className="block w-fit font-semibold">
                          £{data.getSubscription.costs.monthly.toFixed(2)}
                        </p>
                        <p className="block w-fit font-normal">per month</p>
                      </>
                    )}
                  </div>

                  {data?.getSubscription.merchant.icon !== "unknown" && data?.getSubscription.merchant.icon !== null ? (
                    <Image
                      src={data?.getSubscription.merchant.icon as string}
                      alt={data?.getSubscription.merchant.name as string}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  ) : (
                    <BigCircle />
                  )}

                <div className="flex flex-col items-center">
  <p className="text-lbtext px-3 py-1 text-lg block w-fit font-semibold">
    {data?.getSubscription.dates.lastPaymentDate &&
    isBefore(parseISO(data.getSubscription.dates.lastPaymentDate), new Date())
      ? format(
          parseISO(data.getSubscription.dates.lastPaymentDate),
          "do MMM yyyy"
        )
      : "Unknown"}
  </p>
  <p className="w-fit block">Last Payment</p>
</div>
                </div>

                <p className="text-lbtext text-lg text-center mr-16">
                  Renews in days:{" "}
                  {typeof data?.getSubscription?.dates?.endsInDays === "number"
                    ? data.getSubscription.dates.endsInDays
                    : "Unknown"}
                </p>

                {/* Info List */}
                {data?.getSubscription.isManual === false && (
                <div className="grid grid-cols-3 gap-6 mt-12">
                  <div>
                    <p className="text-xs text-gray-500">PROVIDER</p>
                    <p className="font-semibold">
                      {data?.getSubscription.displayName ??
                        data?.getSubscription.merchant?.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-4">
                      SPEND THIS YEAR
                    </p>
                    <p className="font-semibold">£{totalThisYear.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">CATEGORY</p>
                    <p className="font-semibold">
                      {data?.getSubscription?.category?.category}
                    </p>
                    <p className="text-xs text-gray-500 mt-4">TOTAL SPEND</p>
                    <p className="font-semibold">£{allTimeTotal.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">RENEWAL DATE</p>
                    <p className="font-semibold">
                      {data?.getSubscription.dates.renewalDate ?

                      format(
                                parseISO(data?.getSubscription.dates.renewalDate as string),
                                "do MMM yyyy"
                              )
                            : "Unknown Date"}
                    </p>
                    <p className="text-xs text-gray-500 mt-4">
                      EXP TOTAL SPEND THIS YEAR
                    </p>
                    <p className="font-semibold">
                      £
                      {(data?.getSubscription.costs.monthly ?? 0 * 12).toFixed(
                        2
                      )}
                    </p>
                  </div>
                </div>)
}
                <button className="mt-4 mx-auto w-96 bg-lbtext text-white font-semibold py-2 mb-12 px-4 rounded-lg hover:bg-lbgreen cursor-pointer transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>
          )}

          {/* Right Container */}
           {data?.getSubscription.isManual === false && (
          <div className="w-1/2">
            <div className="  max-h-[434px] flex flex-col gap-2 rounded-lg bg-white shadow-lg px-10 py-4 ml-12 mt-13 border-1 border-gray-300">
              <div className="flex flex-col w-full items-start justify-between pb-1 my-2">
                <h2 className="text-2xl font-semibold pb-4 w-full">
                  Transaction  History
                </h2>
                <h2 className="text-xl font-semibold border-b border-lbgray w-full pr-4">
                 Payments
                </h2>
              </div>
              <div className="overflow-y-auto max-h-[300px] scrollbar-nice w-full">
              {data?.getSubscription.transactions &&
                data.getSubscription.transactions.length > 0 &&
             
                // copying the array to ensure data is not mutated
               
                [...data.getSubscription.transactions]
                  // reverse to get last date first
                  .reverse()
                  .map((transaction) => (
                    <div
                      key={transaction?.transactionId}
                      className="flex flex-row justify-between items-center py-2 border-b border-lbgray w-[95%]"
                    >
                      <div className="flex flex-row justify-between items-center w-full gap-4">
                        <div className="flex flex-row gap-4 items-center">
                        {data.getSubscription.merchant?.icon !== "unknown" ? (
                          <Image
                            src={data.getSubscription.merchant.icon as string}
                            alt={data.getSubscription.merchant.name as string}
                            width={50}
                            height={50}
                          />
                        ) : (
                          <Circle/>
                        )}
                       
                        <p className="block bg-lbbgblue text-white px-3 py-1 rounded-lg text-xs">
                          {transaction?.bookingTime
                            ? format(
                                parseISO(transaction.bookingTime),
                                "do MMM yyyy"
                              )
                            : "Unknown Date"}
                        </p>
                        {transaction?.provider?.name &&
                         <p className="block bg-lbgreen text-white px-3 py-1 rounded-lg text-xs">
                          {transaction?.provider?.name}
                        </p>
                        }
                        </div>
                       <p className="block text-lbtext font-semibold text-base">
                          £{transaction?.amount?.amount?.toFixed(2) ?? "0.00"}
                        </p>
                      </div>
                    </div>
                  ))}
                  </div>
            </div>
          </div>)}
        </div>
      </>
  
  );
}
