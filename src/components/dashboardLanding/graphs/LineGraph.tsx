"use client";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetSubscriptionsQuery } from "@/graphql/getMainSubData.generated";
import { LoaderCircle } from "lucide-react";
import { useApolloClient } from "@apollo/client";
import { SubscriptionStatusEnum } from "@/graphql-types/generated/types";
import { GetSubscriptionDocument } from "@/graphql/getSubscriptionDetail.generated";

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

  // useffect to fetch detailed subscription data for each subscription
  // the transaction data for each sub is then saved
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
                fetchPolicy: "cache-first",
              })
              .then((res) => res.data.getSubscription.transactions)
          )
        );

        // setTransaction((prev) => [...prev, ...detailedData]);
        setDetailedSubscriptions(detailedData);
      } catch (err) {
        console.error("Failed to fetch detailed subscriptions", err);
      }
    };

    fetchDetails();
  }, [data?.getSubscriptions?.subscriptions, client]);

  type MonthKey =
    | "jan"
    | "feb"
    | "mar"
    | "apr"
    | "may"
    | "jun"
    | "jul"
    | "aug"
    | "sep"
    | "oct"
    | "nov"
    | "dec";

  const monthTotals: Record<MonthKey, number> = {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  };

  const monthMap: MonthKey[] = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
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


  // get cumulative data for the graph
  // this will be used to show the cumulative spend for each month
  const cumulativeData = (() => {
    const currentMonthIndex = new Date().getMonth();
    let runningTotal = 0;

    return monthMap
      .map((month, index) => {
        if (index >= currentMonthIndex) {
          return null; // Skip months beyond the current month
        }

        runningTotal += monthTotals[month]; // add the month's total to the running total in monthTotals index for each month
        // Return the month and its cumulative spend
        return {
          month: month.charAt(0).toUpperCase() + month.slice(1), // Capitalize first letter
          spend: parseFloat(runningTotal.toFixed(2)),
        };
      })
      .filter(Boolean); // remove nulls
  })();

  if(detailedDescriptions.length > 0){
    console.log(cumulativeData)
  }

  return (
    <div className="relative w-full h-full">
      {detailedDescriptions.length > 0 ? (
        <div className="chart-wrapper w-full h-full" tabIndex={-1}>
          <ResponsiveContainer width="95%" height={350}>
            <AreaChart
              data={cumulativeData}
              margin={{ top: 40, right: 40, left: 20, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6089c2ff" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#cce5ff" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `£${value}`} />
              <Tooltip
                formatter={(value: number) => [
                  `£${value.toFixed(2)}`,
                  "Cumulative Spend",
                ]}
              />
              <Area
                type="monotone"
                dataKey="spend"
                stroke="#426da9"
                fill="url(#colorSpend)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <LoaderCircle className="size-12 mx-auto mt-30 text-lbgreen animate-spin" />
      )}
    </div>
  );
}
