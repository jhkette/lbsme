"use client";
import { useEffect, useState } from "react";
import DashboardSubs from "@/components/dashboardLanding/DashboardSubs";
import Image from "next/image";
import {
  useGetSubscriptionsQuery,
} from "@/graphql/getMainSubData.generated";
import {
  useGetFeaturedDealsQuery
} from "@/graphql/getFeaturedDeals.generated";
import { Subscription } from "@/interfaces/Subscription";
import {
  SuspenseIntro,
  SuspenseTransactions,
} from "@/components/suspense/SuspenseComponents";
import TransactionsLanding from "@/components/dashboardLanding/RenewalSummary";
import DashboardGraph from "@/components/dashboardLanding/DashboardGraph";
import { SubscriptionStatusEnum } from "@/graphql-types/generated/types";
import IntroHome from "@/components/lbcoreui/IntroHome";
import SpendingSummary from "@/components/dashboardLanding/TransactionSummary";
import DealsSummary from "@/components/dashboardLanding/DealsSummary";
import { DealsIntro } from "@/lib/dealsIntro";
import { useApolloClient } from "@apollo/client";
import {GetSubscriptionDocument, GetSubscriptionQuery } from "@/graphql/getSubscriptionDetail.generated"
export default function Home() {

  const [detailedDescriptions, setDetailedSubscriptions ] = useState<GetSubscriptionQuery['getSubscription'][]>([])
  // This query gets the key subscription data - and passes it down to child
  // components
  const { loading, error, data, refetch } = useGetSubscriptionsQuery({
    errorPolicy: "all",
    variables: {
      status: SubscriptionStatusEnum.Active , // Use the correct enum or union value as defined in your GraphQL schema
    },
    fetchPolicy: "cache-and-network",
  });

    const { loading: dealLoading, error: dealError, data: dealData } = useGetFeaturedDealsQuery({
    errorPolicy: "all",
    
    fetchPolicy: "cache-and-network",
  })
  const client = useApolloClient();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!data?.getSubscriptions?.subscriptions) return;

      try {
        const detailedData = await Promise.all(
         data?.getSubscriptions?.subscriptions.map((sub) =>
            client.query({
              query: GetSubscriptionDocument, // Your detailed query
              variables: { id: sub.subscriptionId },
              fetchPolicy: "network-only", // skip cache if needed
            }).then(res => res.data.subscription)
          )
        );

        setDetailedSubscriptions(detailedData);
      } catch (err) {
        console.error("Failed to fetch detailed subscriptions", err);
      }
    };

    fetchDetails();
  }, [ data?.getSubscriptions?.subscriptions]);




  const subs = data?.getSubscriptions?.subscriptions as Subscription[];

  console.log("a list of basic sub data", data?.getSubscriptions?.subscriptions)

  console.log("detailed list of subscriptions", detailedDescriptions)
 
 
  // dashboard page is the main landing page for the dashboard
  // it shows the main subscriptions, the spending summary, transactions, and featured deals
  // these are all components that are imported from the components folder
  return (
    <div className="px-16 w-full mt-14 relative">
      <IntroHome />
      <Image
        src="/images/main/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute -top-2 z-0 right-40 "
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

        {loading  ? <SuspenseTransactions /> : <DealsSummary deals={DealsIntro}/>}
      </div>
    </div>
  );
}
