"use client";
import DashboardSubs from "@/components/subscriptionsLanding/DashboardSubs";
//import { format } from 'date-fns'; // add later
import Image from "next/image";
import { formatDate } from "@/lib/time";
import { useGetSubscriptionsQuery, GetSubscriptionsQueryResult } from "@/graphql/getMainSubData.generated";
import { Subscription } from "@/interfaces/Subscription";



import IntroHome from "@/components/lbcoreui/IntroHome";
export default function Home() {

  const { loading, error, data, refetch } = useGetSubscriptionsQuery( {
    // Optional: Add error policy
    errorPolicy: 'all',
    // Optional: Cache policy
    fetchPolicy: 'cache-and-network',
    // Optional: Poll for updates every 30 seconds
    // pollInterval: 30000,
  });

 const subs = data?.getSubscriptions?.subscriptions as Subscription[]

 

  return (
    <div className="px-16 w-full mt-12 relative">
      <IntroHome  />
      <Image
        src="/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-6 z-0 right-40"
      />
      <DashboardSubs subs={subs} />
    </div>
  );
}
