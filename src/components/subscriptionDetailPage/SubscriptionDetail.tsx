"use client";
import { ArrowLeft, Repeat } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SuspenseSubscriptionDetail } from "@/components/suspense/SuspenseComponents";
import { format, parseISO } from "date-fns";
import { useGetSubscriptionQuery } from "@/graphql/getSubscriptionDetail.generated";

type SubscriptionDetailProps = {
  idToFetch: string;
};

export default function SubscriptionDetail({ idToFetch }: SubscriptionDetailProps) {
  const { loading, error, data, refetch } = useGetSubscriptionQuery({
    variables: { id: idToFetch },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const totalThisYear = (data?.getSubscription?.transactions ?? [])
    .filter((tx): tx is NonNullable<typeof tx> => !!tx && !!tx.bookingTime)
    .filter((tx) => new Date(tx.bookingTime as string).getFullYear() === currentYear)
    .reduce((sum, tx) => sum + (tx.amount?.amount ?? 0), 0);

  const allTimeTotal = (data?.getSubscription?.transactions ?? [])
    .filter((tx): tx is NonNullable<typeof tx> => !!tx && !!tx.bookingTime)
    .reduce((sum, tx) => sum + (tx.amount?.amount ?? 0), 0);

  const totalThisMonth = (data?.getSubscription?.transactions ?? [])
    .filter((tx): tx is NonNullable<typeof tx> => !!tx && !!tx.bookingTime)
    .filter((tx) => {
      const date = new Date(tx.bookingTime as string);
      return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
    })
    .reduce((sum, tx) => sum + (tx.amount?.amount ?? 0), 0);

  return (
    <div>
      <div>
        <Link href="/dashboard/subs">
          <div className="flex flex-row pr-2 items-center gap-1 mb-4 cursor-pointer border-b-2 border-transparent hover:border-lbtext w-fit">
            <ArrowLeft size={20} />
            <p className="text-lbgrey">Go back to subs</p>
          </div>
        </Link>

        <h1 className="text-3xl font-bold text-lbtext mb-4">
          Subscription &gt;{" "}
          {loading ? (
            <span className="blur-sm text-gray-400 select-none">Loading subscription</span>
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
              <div className="flex flex-col gap-2 rounded-lg bg-white shadow-lg p-4 mr-12 mt-14">
                {/* Intro */}
                <div className="flex flex-row items-center gap-4 mx-auto mt-12">
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

                  {data?.getSubscription.merchant.icon !== "unknown" ? (
                    <Image
                      src={data?.getSubscription.merchant.icon as string}
                      alt={data?.getSubscription.merchant.name as string}
                      width={200}
                      height={200}
                    />
                  ) : (
                    <Repeat color="#EDECEC" size={150} />
                  )}

                  <div className="flex flex-col items-center">
                    <p className="text-lbtext px-3 py-1 text-lg block w-fit font-semibold">
                      {data?.getSubscription.dates.lastPaymentDate
                        ? format(parseISO(data.getSubscription.dates.lastPaymentDate), "do MMM yyyy")
                        : "Unknown"}
                    </p>
                    <p className="w-fit block">Last Payment</p>
                  </div>
                </div>

                <p className="text-lbtext text-lg text-center mr-16">
                  Ends in days:{" "}
                  {typeof data?.getSubscription?.dates?.endsInDays === "number"
                    ? data.getSubscription.dates.endsInDays
                    : "Unknown"}
                </p>

                {/* Info List */}
                <div className="grid grid-cols-3 gap-6 mt-24">
                  <div>
                    <p className="text-xs text-gray-500">PROVIDER</p>
                    <p className="font-semibold">
                      {data?.getSubscription.displayName ?? data?.getSubscription.merchant?.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-4">SPEND THIS YEAR</p>
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
                    <p className="font-semibold">{data?.getSubscription.dates.renewalDate}</p>
                    <p className="text-xs text-gray-500 mt-4">EXP TOTAL SPEND THIS YEAR</p>
                    <p className="font-semibold">
                      £{(data?.getSubscription.costs.monthly ?? 0 * 12).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button className="mt-4 mx-auto w-96 bg-lbtext text-white font-semibold py-2 mb-12 px-4 rounded-lg hover:bg-lbgreen cursor-pointer transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>
          )}

          {/* Right Container */}
          <div className="w-1/2">
            <div className="flex flex-col gap-2 rounded-lg bg-white shadow-lg p-4 ml-12 mt-14">
              <div className="flex flex-col w-full items-start justify-between pb-1 my-2">
                <h2 className="text-2xl font-semibold pb-4 w-full">Transaction Activity</h2>
                <h2 className="text-xl font-semibold border-b border-lbtext w-full pr-4">
                  Transaction Activity
                </h2>
              </div>

              {data?.getSubscription.transactions &&
                data.getSubscription.transactions.length > 0 &&
                data.getSubscription.transactions.map((transaction) => (
                  <div
                    key={transaction?.transactionId}
                    className="flex flex-row justify-between items-center py-2 border-b border-lbtextgrey w-full"
                  >
                    <div className="flex flex-row items-center gap-4">
                      {data.getSubscription.merchant?.icon !== "unknown" ? (
                        <Image
                          src={data.getSubscription.merchant.icon as string}
                          alt={data.getSubscription.merchant.name as string}
                          width={50}
                          height={50}
                        />
                      ) : (
                        <Repeat color="#EDECEC" size={50} />
                      )}
                      {/* You can include more transaction details here if needed */}
                      <p>{transaction?.bookingTime ? format(parseISO(transaction.bookingTime), "do MMM yyyy") : "Unknown Date"}</p>
                      <p>£{transaction?.amount?.amount?.toFixed(2) ?? "0.00"}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}