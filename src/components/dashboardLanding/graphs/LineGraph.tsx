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
								query: GetSubscriptionDocument,
								variables: { id: sub.subscriptionId },
								fetchPolicy: "cache-first",
							})
							.then((res) => res.data.getSubscription.transactions),
					),
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

	const currentDate = new Date();
	const currentMonth = currentDate.getUTCMonth(); // 0 = January, 11 = December
	const currentYear = currentDate.getUTCFullYear();

	// Calculate the start date (12 months ago from current month)
	const startDate = new Date(currentYear, currentMonth - 11, 1);
	startDate.setUTCHours(0, 0, 0, 0);

	// Generate array of last 12 months in chronological order
	const last12Months: { month: string; year: number; total: number }[] = [];
	for (let i = 0; i < 12; i++) {
		const date = new Date(currentYear, currentMonth - 11 + i, 1);
		const monthIndex = date.getMonth();
		const year = date.getFullYear();
		last12Months.push({
			month: monthMap[monthIndex],
			year: year,
			total: 0,
		});
	}

	// Aggregate transactions for the last 12 months
	for (const subArray of detailedDescriptions) {
		for (const tx of subArray) {
			const txDate = new Date(tx.bookingTime);
			
			// Find which of the last 12 months this transaction belongs to
			const monthMatch = last12Months.find(
				(m) =>
					txDate.getFullYear() === m.year &&
					monthMap[txDate.getUTCMonth()] === m.month
			);

			if (monthMatch && tx.amount && typeof tx.amount.amount === "number") {
				monthMatch.total += tx.amount.amount;
			}
		}
	}

	// get cumulative data for the graph
	// this will be used to show the cumulative spend for each month
	const cumulativeData = (() => {
		let runningTotal = 0;
		return last12Months.map((monthData) => {
			runningTotal += monthData.total;
			return {
				month: monthData.month.charAt(0).toUpperCase() + monthData.month.slice(1), // Capitalize first letter
				spend: parseFloat(runningTotal.toFixed(2)),
			};
		});
	})();

	if (detailedDescriptions.length > 0) {
		console.log(cumulativeData);
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
								formatter={(value: number | undefined) => [
									`£${(value ?? 0).toFixed(2)}`,
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
