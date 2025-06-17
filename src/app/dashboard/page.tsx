"use client";
import DashboardSubs from "@/components/subscriptionsLanding/DashboardSubs";
//import { format } from 'date-fns'; // add later
import Image from "next/image";
// import { formatDate } from "@/lib/time";

import IntroHome from "@/components/lbcoreui/IntroHome";
export default function Home() {
  // const now2 = new Date();
  // const sixMonthsAgo2 = subMonths(new Date(), 6);
  //  const formatDate = (date: Date) => moment(date).format("YYYY-MM-DD"); 

  // const { data, loading } = useGetSubscriptionsSummaryQuery({
  //   variables: {
  //     from: formatDate(sixMonthsAgo2),
  //     to: formatDate(now2),
  //   },
  //   fetchPolicy: "cache-and-network",
  // });

  // console.log(loading, data, "data");
 

 

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
      <DashboardSubs />
    </div>
  );
}
