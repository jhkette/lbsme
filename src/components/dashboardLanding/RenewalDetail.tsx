import { Subscription } from "@/interfaces/Subscription";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Circle from "@/components/lbcoreui/Circle";

interface TransactionDetailProps {
	sub: Subscription;
	renewal: boolean;
}
export default function TransactionDetail(props: TransactionDetailProps) {
	if (!props.sub) {
		return;
	}

	const icon = props.sub.merchant.icon;
	// return early if the renewal date is in the past
	if (new Date() > new Date(props.sub.dates.renewalDate)) {
		return;
	}
	if (
		new Date() < new Date(props.sub.dates.lastPaymentDate) &&
		!props.renewal
	) {
		return;
	}
	return (
		<div className="flex flex-row justify-between py-2 gap-8 items-center border-b-1">
			<div className="flex flex-row items-center gap-4">
				{icon !== "unknown" && icon !== null ? (
					<Image
						src={icon}
						alt={props.sub.displayName}
						width={50}
						height={50}
					/>
				) : (
					<Circle />
				)}

				<p className=" bg-lbbgblue text-white px-3 py-1 rounded-lg text-xs">
					{" "}
					{props.sub?.type ? props.sub?.type : "Unknown"}{" "}
				</p>
				{props.sub.merchant.name && props.sub.merchant.name.length > 40 ? (
					<p className="text-xs block max-w-[190px] lg:max-w-[240px] text-wrap">
						{props.sub.merchant.name}
					</p>
				) : (
					<p className="text-sm md:text-base block max-w-[190px] lg:max-w-[240px] text-wrap">
						{props.sub.merchant.name ? props.sub.merchant.name : ""}
					</p>
				)}
			</div>
			<div className="flex flex-col items-end w-[175px] md:w-[190px]">
				<p className="font-semibold w-full text-right">
					{props.renewal
						? format(parseISO(props.sub.dates.renewalDate), "do MMM yyyy")
						: format(parseISO(props.sub.dates.lastPaymentDate), "do MMM yyyy")}
				</p>
				<p className="text-xs text-orange-400 w-full text-right">
					{props.renewal &&
						(() => {
							const days = props.sub.dates.endsInDays;
							if (days > 1) return `Subscription renews in ${days} days`;
							if (days === 1) return "Subscription renews tomorrow";
							return "Subscription renews within 24 hours";
						})()}
				</p>
			</div>
		</div>
	);
}
