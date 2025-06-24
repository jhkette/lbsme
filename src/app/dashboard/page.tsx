"use client";
import DashboardSubs from "@/components/subscriptionsLanding/DashboardSubs";
import { Suspense } from "react";
//import { format } from 'date-fns'; // add later
import Image from "next/image";
import { formatDate } from "@/lib/time";
import {
  useGetSubscriptionsQuery,
  GetSubscriptionsQueryResult,
} from "@/graphql/getMainSubData.generated";
import { Subscription } from "@/interfaces/Subscription";
import {
  SuspenseIntro,
  SuspenseTransactions,
} from "@/components/suspense/SuspenseComponents";
import TransactionsLanding from "@/components/subscriptionsLanding/TransactionsLanding";
import DashboardGraph from "@/components/subscriptionsLanding/DashboardGraph";
import { SuspenseDashboardGraph } from "@/components/suspense/SuspenseComponents";
import IntroHome from "@/components/lbcoreui/IntroHome";
import SpendingSummary from "@/components/subscriptionsLanding/SpendingSummary";
export default function Home() {
  const { loading, error, data, refetch } = useGetSubscriptionsQuery({
    // Optional: Add error policy
    errorPolicy: "all",
    // Optional: Cache policy
    fetchPolicy: "cache-and-network",
    // Optional: Poll for updates every 30 seconds
    // pollInterval: 30000,
  });
  console.log(data, "main data");
  const subs = data?.getSubscriptions?.subscriptions as Subscription[];
  const transactions = data?.getSubscriptions?.subscriptions?.map(
    (transaction) => transaction.dates.lastPaymentDate
  ) as string[];
  console.log(transactions);

  return (
    <div className="px-16 w-full mt-12 relative">
      <IntroHome />
      <Image
        src="/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-6 z-0 right-40"
      />
      {loading ? <SuspenseIntro /> : <DashboardSubs subs={subs} />}
      <div className="my-16 flex flex-row gap-12">
        {loading ? <SuspenseDashboardGraph /> : <DashboardGraph />}
   {loading ? (
          <SuspenseTransactions />
        ) : (
       <SpendingSummary subs={subs}/>
        )}
      </div>
      <div className="my-16 flex flex-row gap-12">
       {loading ? (
          <SuspenseTransactions />
        ) : (
          <TransactionsLanding subs={subs} />
        )}


        {loading ? <SuspenseDashboardGraph /> : <DashboardGraph />}
        </div>
    </div>
  );
}
