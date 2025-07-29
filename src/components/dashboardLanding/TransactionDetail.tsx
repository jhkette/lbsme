import React from "react";
import { Subscription } from "@/interfaces/Subscription";
import { useGetSubscriptionQuery } from "@/graphql/getSubscriptionDetail.generated";
import Image from "next/image";
import { Repeat } from "lucide-react";
import Circle from "@/components/lbcoreui/Circle";

interface SpendingDetailProps {
  sub: Subscription;
  yearly: boolean
}

export default function SpendingDetail(props: SpendingDetailProps) {
  const { loading, error, data, refetch } = useGetSubscriptionQuery({
    variables: { id: props.sub.subscriptionId },
    // Optional: Add error policy
    errorPolicy: "all",
    // Optional: Cache policy
    fetchPolicy: "cache-and-network",
    // Optional: Poll for updates every 30 seconds
    // pollInterval: 30000,
  });


const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

  if (loading) {
    return null;
  }

  const icon = data?.getSubscription.merchant.icon as string;

  // Sum the amounts of transactions from the current year
  const totalThisYear = (data?.getSubscription?.transactions ?? [])
    .filter((tx): tx is NonNullable<typeof tx> => !!tx && !!tx.bookingTime)
    .filter(
      (tx) => new Date(tx.bookingTime as string).getFullYear() === currentYear
    )
    .reduce(
      (sum, tx) => sum + (tx.amount && tx.amount.amount ? tx.amount.amount : 0),
      0
    );


const totalThisMonth = (data?.getSubscription?.transactions ?? [])
  .filter((tx): tx is NonNullable<typeof tx> => !!tx && !!tx.bookingTime)
  .filter((tx) => {
    const date = new Date(tx.bookingTime as string);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  })
  .reduce(
    (sum, tx) => sum + (tx.amount && tx.amount.amount ? tx.amount.amount : 0),
    0
  )

  return (
    <div className="flex flex-row justify-between gap-4 py-2 border-b-1 items-center">
      <div className="flex flex-row items-center justify-start gap-4">
        {icon !== "unknown"  && icon !== null ? (
          <Image
            src={icon}
            alt={data?.getSubscription.displayName as string}
            width={50}
            height={50}
          />
        ) : (
          <Circle/>
        )}

        <p className="hidden md:block bg-lbbgblue text-white px-3 py-1 rounded-lg text-xs">
          {" "}
          {data?.getSubscription.paymentMethod
            ? data?.getSubscription.paymentMethod
            : "Unknown"}{" "}
        </p>
        <div>
          {data?.getSubscription.merchant.name && data.getSubscription.merchant.name.length > 40 ? (
            <p className="text-xs block w-fit">{data.getSubscription.merchant.name}</p>
          ) : (
            <p className="text-sm md:text-base block w-fit">{data?.getSubscription.merchant.name ? data.getSubscription.merchant.name : ""}</p>
          )}
        </div>
      </div>
      <p className="text-lg font-semibold">{ props.yearly ?`£${totalThisYear.toFixed(2)}` :  `£${totalThisMonth.toFixed(2)}`} </p>
    </div>
  );
}

//
