"use client";
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

export default function Home() {
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
  console.log("dealData", dealData);

interface DealIntro {
  name: string;
    description: React.ReactNode;
    link: string
}

  const dealsIntro: DealIntro[] = [
  {
    name: "Free trials",
    description: (
      <p className="text-center text-base text-lbtextgrey font-bold">
        A selection of <span className="text-pink-500">Free trials</span>
      </p>
    ),
    link: "/dashboard/marketplace/freetrials"
  },
  {
    name: "Best deals",
    description: (
      <p className="text-center text-base text-lbtextgrey font-bold">
        A selection of <span className="text-pink-500">offers and deals</span>
      </p>
    ),
     link: "/dashboard/marketplace/bestdeals"
  },
  {
    name: "View all",
    description: (
      <p className="text-center text-base text-lbtextgrey font-bold">
        View a selection of <span className="text-pink-500">trials and offers</span>
      </p>
    ),
    link: "/dashboard/marketplace"
  },
];
  const subs = data?.getSubscriptions?.subscriptions as Subscription[];
 
  // dashboard page is the main landing page for the dashboard
  // it shows the main subscriptions, the spending summary, transactions, and featured deals
  // these are all components that are imported from the components folder
  return (
    <div className="px-16 w-full mt-14 relative">
      <IntroHome />
      <Image
        src="/lbgraphic.png"
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

        {loading  ? <SuspenseTransactions /> : <DealsSummary deals={dealsIntro}/>}
      </div>
    </div>
  );
}
