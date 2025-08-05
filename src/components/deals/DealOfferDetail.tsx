"use client"
import Image from "next/image"
import { ChevronRight } from 'lucide-react';
import slugify from "slugify"
import { useGetAllDealsQuery} from '@/graphql/getAllDeals.generated';
import Link from "next/link"

interface DealOfferDetailProps {
  categoryParam: string
  slugParam: string
}

export interface Deal {
  __typename: "GetAllDealsResult";
  currency: string;
  description: string;
  logo: string;
  name: string;
  price: number;
  url: string;
  summary?: string;
}

export interface DealItem{
    deals: Deal []
    category: string
}

export default function DealOfferDetail({ slugParam, categoryParam }: DealOfferDetailProps ) {
      const { loading, error, data, refetch } = useGetAllDealsQuery({
          errorPolicy: "all",
         
          fetchPolicy: "cache-and-network",
        });

    const deals =    data?.getAllDeals

  function getFinalDeal(deals: DealItem[] | undefined, categoryParam: string, slugParam: string ): Deal | undefined {
  if (!deals) return undefined;

  // Step 1: Filter by category
  const categoryDeals = deals.filter(
    (deal) => slugify(deal.category, { lower: true }) === categoryParam
  );

  // Step 2: Find the deal by slugified name
  const allDealsInCategory = categoryDeals.flatMap((item) => item.deals);
  const finalDeal = allDealsInCategory.find(
    (deal) => slugify(deal.name , { lower: true }) === slugParam
  );

  return finalDeal;
}
const foundItem = getFinalDeal(deals as DealItem[], categoryParam, slugParam)

  console.log(foundItem)

       
  return (
    <div>


        <h1 className="font-bold text-4xl my-8 text-lbtext z-10 relative">
        Deals Marketplace &gt; {foundItem?.name}
      </h1>

     

      <div className="deals w-full bg-white p-8 rounded-md mt-12">
        <p className="text-lbgreen font-semibold">Little Birdie reccomends:</p>
        {foundItem?.logo &&
        <Image src={foundItem.logo as string} alt={foundItem.name + " logo"} width={150} height={150} />
}
       
        <p className="font-bold">Details:</p>
        <p>{foundItem?.description}</p>
        {foundItem?.url && (
            <Link href={foundItem.url}> 
          <button className="flex flex-row justify-around items-center bg-lbtext hover:bg-lbgreen mt-4 py-3 w-64 rounded-md text-white font-semibold cursor-pointer">
           VIEW THE DEAL <ChevronRight />
          </button>
          </Link>
        )}
      </div>
    </div>
  )


}
