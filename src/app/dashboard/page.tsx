"use client";
import DashboardSubs from "@/components/subscriptionsLanding/DashboardSubs";
import Image from "next/image";
import {
  useGetSubscriptionsQuery,
} from "@/graphql/getMainSubData.generated";
import { Subscription } from "@/interfaces/Subscription";
import {
  SuspenseIntro,
  SuspenseTransactions,
} from "@/components/suspense/SuspenseComponents";
import TransactionsLanding from "@/components/subscriptionsLanding/RenewalSummary";
import DashboardGraph from "@/components/subscriptionsLanding/DashboardGraph";

import IntroHome from "@/components/lbcoreui/IntroHome";
import SpendingSummary from "@/components/subscriptionsLanding/TransactionSummary";
import DealsSummary from "@/components/subscriptionsLanding/DealsSummary";
export default function Home() {
  // This query gets the key subscription data - and passes it down to child
  // components
  const { loading, error, data, refetch } = useGetSubscriptionsQuery({
    errorPolicy: "all",

    fetchPolicy: "cache-and-network",
  });
  
  const subs = data?.getSubscriptions?.subscriptions as Subscription[];
  const transactions = data?.getSubscriptions?.subscriptions?.map(
    (transaction) => transaction.dates.lastPaymentDate
  ) as string[];
 
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
        {loading ? <SuspenseTransactions /> : <DashboardGraph subs={subs} />}
        {loading ? <SuspenseTransactions /> : <SpendingSummary subs={subs} />}
      </div>
      <div className="my-16 flex flex-row gap-12">
        {loading ? (
          <SuspenseTransactions />
        ) : (
          <TransactionsLanding subs={subs} />
        )}

        {loading ? <SuspenseTransactions /> : <DealsSummary />}
      </div>
    </div>
  );
}
