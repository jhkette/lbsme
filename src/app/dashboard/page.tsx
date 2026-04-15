"use client";
import { useEffect, useState } from "react";
import DashboardSubs from "@/components/dashboardLanding/DashboardSubs";
import Image from "next/image";
import { useGetSubscriptionsQuery } from "@/graphql/getMainSubData.generated";

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
import { DealsIntro } from "@/components/dashboardLanding/dealsIntro";
import DashboardNoSubs from "@/components/dashboardLanding/DashboardNoSubs";

import { GetSubscriptionQuery } from "@/graphql/getSubscriptionDetail.generated";
export default function Home() {
	const [detailedDescriptions, setDetailedSubscriptions] = useState<
		GetSubscriptionQuery["getSubscription"][]
	>([]);
	// This query gets the key subscription data - and passes it down to child
	// components
	const { loading, error, data, refetch } = useGetSubscriptionsQuery({
		errorPolicy: "all",
		variables: {
			status: SubscriptionStatusEnum.Active, // Use the correct enum or union value as defined in your GraphQL schema
		},
		fetchPolicy: "cache-and-network",
	});

	const subs = (data?.getSubscriptions?.subscriptions ?? []) as Subscription[];

	// handle logging in with no subscriptions to show
	if (!loading && !error && subs.length === 0) {
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
				<DashboardNoSubs />
			</div>
		);
	}

	if (!loading && (error || !data?.getSubscriptions)) {
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
				<div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-2xl">
					<p className="text-lg font-semibold text-lbtext">
						Unable to load dashboard data.
					</p>
					<p className="mt-2 text-sm text-lbtextgrey">
						Your session may be valid for login but not authorized for the current
						GraphQL endpoint.
					</p>
				</div>
			</div>
		);
	}

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

				{loading ? (
					<SuspenseTransactions />
				) : (
					<DealsSummary deals={DealsIntro} />
				)}
			</div>
		</div>
	);
}
