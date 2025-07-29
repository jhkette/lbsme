"use client"
import Image from "next/image"
import { ChevronRight } from 'lucide-react';
import slugify from "slugify"
import { useGetTrialsQuery } from '@/graphql/getTrials.generated';
import Link from "next/link";

interface FreeTrialsDetailProps {
  freeItem: string
}

export default function FreeTrialsDetail({ freeItem }: FreeTrialsDetailProps) {
      const { loading, error, data, refetch } = useGetTrialsQuery({
          errorPolicy: "all",
         
          fetchPolicy: "cache-and-network",
        });

  const foundItem = data?.getTrials.items.find((item) => {
      const slug = slugify(item.name,  { lower: true });
      return slug === freeItem
  })

  console.log(foundItem)

       
  return (
    <div>


        <h1 className="font-bold text-4xl my-8 text-lbtext z-10 relative">
        Deals Marketplace &gt; {foundItem?.name}
      </h1>

      <Image
        src="/images/main/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-6 z-0 right-40"
      />

      <div className="deals w-full bg-white p-8 rounded-md mt-12">
        <p className="text-lbgreen font-semibold">Little Birdie recommends:</p>
       
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
