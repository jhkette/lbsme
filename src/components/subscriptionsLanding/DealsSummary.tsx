import React from 'react'
import { useGetFeaturedDealsQuery } from '@/graphql/getFeaturedDeals.generated'

export default function DealsSummary() {

    const { loading, error, data, refetch } = useGetFeaturedDealsQuery ({
      errorPolicy: "all",
  
      fetchPolicy: "cache-and-network",
    });
    console.log(data, "main deals");

  return (
       <div className="w-1/2 p-4 rounded-lg shadow-lg bg-white max-h-110">
        <div className="flex flex-row items-center justify-between mx-8 pb-1 border-b-1 border-lbtextgrey">
        <h2 className="text-lg font-semibold">Featured deals</h2>{" "}
        </div>
    </div>
  )
}
