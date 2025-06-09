"use client";
import DashboardSubs from "@/components/subscriptionsLanding/DashboardSubs";
//import { format } from 'date-fns'; // add later
import Image from "next/image";

import IntroHome from "@/components/lbcoreui/IntroHome";
export default function Home() {

  // const {
  //   data: spendingsData,
  //   loading: spendingsLoading,
  //   refetch: spendingsRefetch,
  // } = useGetSubscriptionSpendingsQuery({
  //   variables: {
  //     from: formatDate(selectedDates.start),
  //     to: formatDate(selectedDates.end),
  //     category: userCategory.searchName,
  //   },
  //   fetchPolicy: "cache-and-network",
  // });
  
  //const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');
  return (
    <div className="px-16 w-full mt-12 relative">
      <IntroHome/>
      <Image
        src="/lbgraphic.png"
        height={300}
        width={500}
        alt="graphic"
        className="absolute -top-3 z-0 right-40"
      />
      <DashboardSubs />
    </div>
  );
}
