import React from "react";
// import { useGetFeaturedDealsQuery } from "@/graphql/getFeaturedDeals.generated";
import SmallDealItem from "./DealSmall";
// import { sanityFetch } from "@/sanity/lib/live";

interface SubCategoryResult {
  __typename?: "SubCategoryResult";
  name?: string;
  PK?: string;
  SK?: string;
  searchName?: string;
}

interface FeaturedDealsResult {
  __typename?: "FeaturedDealsResult";
  name: string;
  icon: string;
  saveUp?: number | null | undefined;
  category?: SubCategoryResult[];
}

export default function DealsSummary({
  deals,
}: {
  deals?: FeaturedDealsResult[];
}) {
  let finalData;
  if (deals && deals.length > 0) {
    finalData = deals.slice(0, 4);
  }

  const simplifiedData = deals?.map((deal) => {
    return {
      name: deal.name,
      icon: deal.icon,
    };
  });

  console.log("deals", deals);

  return (
    <div className="scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen w-1/2  py-4 rounded-2xl shadow-2xl bg-white max-h-120 overflow-y-auto">
      <div className="flex flex-row items-center justify-between mx-8 pb-1 my-2">
        <h2 className="text-2xl font-semibold">Featured Deals</h2>{" "}
      </div>

      <div className="flex flex-row flex-wrap mx-auto px-8">
        {simplifiedData?.map((deal) => {
          return <SmallDealItem deal={deal} key={deal.name} />;
        })}
      </div>
    </div>
  );
}
