"use client";
import React, { useEffect, useState } from "react";
import { useGetProviderlessUserAuthGatewayLazyQuery } from "@/graphql/getOpenBanking.generated";

import ConnectAccounts from "@/components/connectedAccounts/connectAccounts";

import Image from "next/image";

import { SubscriptionsBankConnection } from "@/components/suspense/SuspenseComponents";
import { useStatusQuery } from "@/graphql/getSubscribedStatus.generated";

// this page could be broken down into smaller components for better readability and maintainability
export default function Page() {
	const [isHydrated, setIsHydrated] = useState(false);

	//const url = data?.getProviderlessUserAuthGateway?.url;

	// Fetch as soon as the page mounts — don't wait for subscribed to finish
	// useEffect(() => {
	// 	fetchUrl();
	// }, []);

	const { data: subData, loading: subLoading } = useStatusQuery({
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (!subLoading && subData) {
			console.log("Subscription Data:", subData);
			// data?.getProviderlessUserAuthGateway?.url;
		}
	}, [subLoading, subData]);

	// Log after data changes
	// useEffect(() => {
	// 	console.log("Fetched URL:", url);
	// 	console.log("Loading state:", queryLoading);
	// 	console.log("Error state:", error);
	// 	console.log("Full data response:", data);
	// }, [url, queryLoading, error, data]);

	return (
		<div className="px-16 w-full mt-14 relative">
			<h1 className="text-4xl font-semibold text-lbtext pt-2">
				Connected Bank Accounts
			</h1>
			<Image
				src="/images/main/lbgraphic.png"
				height={250}
				width={400}
				alt="graphic"
				className="absolute -top-2 z-0 right-40 "
			/>
			{/* {isHydrated &&
        (subData?.getSubscribedStatus.subscribed ? (
          <div className="my-16 mt-21">
            <p>subscribed</p>
          </div>
        ) : (
          <div className="my-16 mt-21">
            <p>not subscribed</p>
          </div>
        ))} */}

			<div className="my-16 mt-21">
				{subLoading ? (
					<SubscriptionsBankConnection />
				) : subData?.getSubscribedStatus.subscribed ? (
					<ConnectAccounts />
				) : (
					<div>Not subscribed</div>
				)}
			</div>
		</div>
	);
}
