"use client";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useGetSubscriptionsQuery } from "@/graphql/getMainSubData.generated";
import { LoaderCircle } from "lucide-react";
import { useApolloClient } from "@apollo/client";
import { SubscriptionStatusEnum } from "@/graphql-types/generated/types";
import {
  GetSubscriptionDocument,
  GetSubscriptionQuery,
} from "@/graphql/getSubscriptionDetail.generated";
import { de } from "date-fns/locale";

export default function LineChartPayment() {
      const client = useApolloClient();
  const [detailedDescriptions, setDetailedSubscriptions] = useState<any[]>([]);


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
  
 

type MonthKey = "jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec";

const monthTotals: Record<MonthKey, number> = {
  jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0,
  jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0
};

const monthMap: MonthKey[] = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec"
];

const currentYear = new Date().getUTCFullYear();

for (const subArray of detailedDescriptions) {
  for (const tx of subArray) {
    const date = new Date(tx.bookingTime);
    const year = date.getUTCFullYear();
    if (year !== currentYear) continue;

    const monthName = monthMap[date.getUTCMonth()];
    if (monthName && tx.amount && typeof tx.amount.amount === "number") {
      monthTotals[monthName] += tx.amount.amount;
    }
  }
}

const cumulativeData = (() => {
  const currentMonthIndex = new Date().getMonth(); 
  let runningTotal = 0;

  return monthMap.map((month, index) => {
    if (index > currentMonthIndex) {
      return null; // Skip months beyond the current month
    }

    runningTotal += monthTotals[month];
    return {
      month: month.charAt(0).toUpperCase() + month.slice(1), // Capitalize first letter
      spend: parseFloat(runningTotal.toFixed(2))
    };
  }).filter(Boolean); // remove nulls
})();



  return(
    <div className="relative w-full h-full">
    {detailedDescriptions.length > 0 ? (
      <ResponsiveContainer width="100%" height={350}>
    <LineChart data={cumulativeData} margin={{ top: 40, right: 40, left: 20, bottom: 20 }}>
     
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip 
       formatter={(value: number) => [
            `£${value.toFixed(2)}`,
            "Cumulative Spend",
          ]}/>
      <Line type="monotone" dataKey="spend" stroke="#426da9" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
    ) : (
      <LoaderCircle className="size-12 mx-auto mt-30 text-lbgreen animate-spin" />
    )}
  </div>
    
);
  

}
