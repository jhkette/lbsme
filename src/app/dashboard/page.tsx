"use client";
import DashboardSubs from "@/components/subscriptionsLanding/DashboardSubs";
//import { format } from 'date-fns'; // add later
import Image from "next/image";
import { formatDate } from "@/lib/time";
import { useGetSubscriptionSpendingsQuery } from "@/graphql/getSubscriptionSpendings.generated";



import { useQuery, gql } from '@apollo/client';
  

// Define the GraphQL query
const GET_SUBSCRIPTIONS = gql`
  query getSubscriptions {
    getSubscriptions(status: ACTIVE) {
       subscriptions {
        merchant {
          icon
          id
          name
        }
            category {
        PK
        SK
        category
        searchCategory
        searchSubCategory
        subCategory
      }
      dates {
        endsInDays
        endsInPercent
        lastPaymentDate
        renewalDate
      }
        displayName
        cancellationStatus
        monthlyCost
        paymentMethod
        priceChange
        providerName
        subscriptionId
        type
        saveUp
      }
    }
  }
`;

import IntroHome from "@/components/lbcoreui/IntroHome";
export default function Home() {

  const { loading, error, data, refetch } = useQuery(GET_SUBSCRIPTIONS, {
    // Optional: Add error policy
    errorPolicy: 'all',
    // Optional: Cache policy
    fetchPolicy: 'cache-and-network',
    // Optional: Poll for updates every 30 seconds
    // pollInterval: 30000,
  });
  console.log(data)
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  //  const {
  //   data: spendingsData,
  //   loading: spendingsLoading,
  //   refetch: spendingsRefetch,
  //   error: spendingError
  // } = useGetSubscriptionSpendingsQuery({
  //   variables: {
  //     from: formatDate(oneYearAgo),
  //     to: formatDate(currentDate),
  //     category: "all"
  //   },
  //   fetchPolicy: "cache-and-network",
  // });

  // console.log(spendingsData, spendingError, "this is spendings data")
 

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
