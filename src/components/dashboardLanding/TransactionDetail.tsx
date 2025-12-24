import React from "react";
import { Subscription } from "@/interfaces/Subscription";
import { useGetSubscriptionQuery } from "@/graphql/getSubscriptionDetail.generated";
import Image from "next/image";
import Circle from "@/components/lbcoreui/Circle";

interface SpendingDetailProps {
	sub: Subscription;
	yearly: boolean;
}

export default function SpendingDetail(props: SpendingDetailProps) {
	const { loading, error, data, refetch } = useGetSubscriptionQuery({
		variables: { id: props.sub.subscriptionId },
		// Optional: Add error policy
		errorPolicy: "all",
		// Optional: Cache policy
		fetchPolicy: "cache-and-network",
		// Optional: Poll for updates every 30 seconds
		// pollInterval: 30000,
	});

	const now = new Date();

	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth();

	if (loading) {
		return null;
	}

	const icon = data?.getSubscription.merchant.icon as string;

	const totalThisMonth = (data?.getSubscription?.transactions ?? [])
		.filter((tx): tx is NonNullable<typeof tx> => !!tx && !!tx.bookingTime)
		.filter((tx) => {
			const date = new Date(tx.bookingTime as string);
			return (
				date.getFullYear() === currentYear && date.getMonth() === currentMonth
			);
		})
		.reduce(
			(acc, tx) => {
				const date = new Date(tx.bookingTime as string);
				const dateKey = date.toISOString().split("T")[0]; // YYYY-MM-DD
				// filter to check date isn't on same day (ie not in set) - as this can be an error
				if (!acc.seenDates.has(dateKey)) {
					acc.sum += tx.amount?.amount ?? 0;
					acc.seenDates.add(dateKey);
				}

				return acc;
				// return the sum, seenDates is the set being checked
			},
			{ sum: 0, seenDates: new Set<string>() },
		).sum;
	const isManual = data?.getSubscription?.isManual || false;
	const renewalDate = new Date(data?.getSubscription?.dates.renewalDate || "");
	const isAfterRenewal = now > renewalDate;

	let displayAmount: string | null;

	if (props.yearly) {
		displayAmount = isManual
			? null
			: `£${data?.getSubscription?.costs?.yearly.toFixed(2)}`;
	} else if (data?.getSubscription?.isManual && isAfterRenewal) {
		displayAmount = `£${data?.getSubscription?.costs?.monthly ?? "0.00"}`;
	} else {
		displayAmount = `£${totalThisMonth.toFixed(2)}`;
	}

	return (
		<>
			{displayAmount !== null && (
				<div className="flex flex-row justify-between gap-4 py-2 border-b-1 items-center">
					<div className="flex flex-row items-center justify-start gap-4">
						{typeof icon === "string" && icon !== "unknown" && icon !== "" ? (
							<Image
								src={icon}
								alt={data?.getSubscription.displayName as string}
								width={50}
								height={50}
							/>
						) : (
							<Circle />
						)}

						<p className="hidden md:block bg-lbbgblue text-white px-3 py-1 rounded-lg text-xs">
							{" "}
							{data?.getSubscription.paymentMethod
								? data?.getSubscription.paymentMethod
								: "Unknown"}{" "}
						</p>
						<div>
							{data?.getSubscription.merchant.name &&
							data.getSubscription.merchant.name.length > 40 ? (
								<p className="text-xs block w-fit">
									{data.getSubscription.merchant.name}
								</p>
							) : (
								<p className="text-sm md:text-base block w-fit">
									{data?.getSubscription.merchant.name
										? data.getSubscription.merchant.name
										: ""}
								</p>
							)}
						</div>
					</div>
					<p className="text-lg font-semibold">{displayAmount}</p>
				</div>
			)}
		</>
	);
}
