"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Pie,
  Bar,
  Cell,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetSubscriptionsQuery } from "@/graphql/getMainSubData.generated";
import { format } from "date-fns";
import { useApolloClient } from "@apollo/client";
import { SubscriptionStatusEnum } from "@/graphql-types/generated/types";
import {
  GetSubscriptionDocument,
  GetSubscriptionQuery,
} from "@/graphql/getSubscriptionDetail.generated";
import { de } from "date-fns/locale";

export default function LineChartPayment() {
      const client = useApolloClient();
  const [detailedDescriptions, setDetailedSubscriptions] = useState<string[]>([]);


  const { loading, error, data, refetch } = useGetSubscriptionsQuery({
    errorPolicy: "all",
    variables: {
      status: SubscriptionStatusEnum.Active, 
    },
    fetchPolicy: "cache-and-network",
  });

  

  useEffect(() => {
    const fetchDetails = async () => {
      if (!data?.getSubscriptions?.subscriptions) return;

      try {
        const detailedData = await Promise.all(
          data?.getSubscriptions?.subscriptions.map((sub) =>
            client
              .query({
                query: GetSubscriptionDocument, // Your detailed query
                variables: { id: sub.subscriptionId },
                fetchPolicy: "network-only", // skip cache if needed
              })
              .then((res) => res.data.getSubscription.transactions)
          )
        );
        console.log("Detailed subscription data fetched", detailedData);

        // setTransaction((prev) => [...prev, ...detailedData]);
        setDetailedSubscriptions(detailedData);
      } catch (err) {
        console.error("Failed to fetch detailed subscriptions", err);
      }
    };

    fetchDetails();
  }, [data?.getSubscriptions?.subscriptions]);
  const getMonthInitials = () => {
    const now = new Date();
    const currentMonthIndex = now.getMonth(); // 0-based: January = 0, December = 11
    const monthInitials = [];

    for (let i = 0; i <= currentMonthIndex; i++) {
      const monthDate = new Date(now.getFullYear(), i, 1);
      const monthInitial = format(monthDate, "MMM")[0];
      monthInitials.push(monthInitial);
    }

    return monthInitials;
  };

  const monthXdata = getMonthInitials();
  console.log("monthXdata", monthXdata, detailedDescriptions, "detailedDescriptions");

  return(
    <p>graph</p>
  )

}
