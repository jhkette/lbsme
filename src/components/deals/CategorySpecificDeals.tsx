"use client";
import slugify from "slugify";
import Image from "next/image";
import Link from "next/link";
import { SuspenseDeals } from "@/components/suspense/SuspenseComponents";
import { useGetAllDealsQuery } from "@/graphql/getAllDeals.generated";
type DealProps = {
	category: string;
};

export default function CategrorySpecificDeals({ category }: DealProps) {
	const { loading, error, data, refetch } = useGetAllDealsQuery({
		errorPolicy: "all",

		fetchPolicy: "cache-and-network",
	});
	const groupedData = data?.getAllDeals.find((deal) => {
		const slug = slugify(deal.category, { lower: true });
		return slug === category;
	});

	return (
		<section className="flex flex-col justify-start items-end w-full mt-30 rounded-lg shadow-lg mb-12">
			<div className="w-full bg-lbgray rounded-t-lg p-3">
				<h2 className="text-2xl font-semibold text-lbtext">Best Deals</h2>
			</div>
			{loading ? (
				<SuspenseDeals />
			) : (
				<div className="overflow-x-auto scrollbar-nice flex flex-row py-4 pl-12 rounded-b-lg  bg-white justify-start items-end w-full flex-wrap max-h-[550px] ">
					{category && groupedData
						? groupedData.deals.map((deal) => {
								console.log(deal, "this is catehory specific deal");
								const dealSlug = slugify(deal.name, { lower: true });

								return (
									<Link
										key={dealSlug}
										href={`/dashboard/marketplace/best-deals/${category}/${dealSlug}`}
										className="hover:scale-105 transition-transform duration-300 hover: opacity-90 ease-in-out"
									>
										<div className="relative bg-[url(/images/deals/dealbg.png)] min-w-[275px] min-h-[185px] max-w-[275px] max-h-[185px] bg-center bg-no-repeat bg-cover my-4 mx-4 py-8">
											<p className="text-center p-4 text-lg text-lbtext font-bold max-w-[180]">
												{deal.name}
											</p>
											<Image
												src={deal.logo}
												alt={category || ""}
												width={60}
												height={60}
												style={{ height: "auto" }}
												className="rounded absolute right-2 bottom-4"
											/>
										</div>
									</Link>
								);
							})
						: null}
				</div>
			)}
		</section>
	);
}
