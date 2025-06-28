
import React from 'react'
import { useGetFeaturedDealsQuery } from '@/graphql/getFeaturedDeals.generated'
import SmallDealItem from './DealSmall';
import { sanityFetch } from "@/sanity/lib/live";
import { SUBSCRIPTION_DEAL_QUERY, SWITCH_DEAL_QUERY } from "@/sanity/queries";
import DealItem from "@/components/deals/DealItem";

export default function DealsSummary() {

    // const { data: subscriptionDeals } = await sanityFetch({
    //   query: SUBSCRIPTION_DEAL_QUERY,
    // });
    // const { data: switchDeals } = await sanityFetch({ query: SWITCH_DEAL_QUERY });

    const { loading, error, data, refetch } = useGetFeaturedDealsQuery ({
      errorPolicy: "all",
  
      fetchPolicy: "cache-and-network",
    });
  
    let finalData;
    if(data && !loading && !error){
     finalData=  data.getFeaturedDeals.slice(0,4)
    }

    const simplifiedData = finalData?.map((deal) => {
      return {
        name: deal.name,
        icon: deal.icon
      }
    })
    console.log(simplifiedData)
   

  return (
       <div className="scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen w-1/2  py-4 rounded-lg shadow-lg bg-white max-h-110 overflow-y-auto">
        <div className="flex flex-row items-center justify-between mx-8 pb-1 border-b-1 border-lbtextgrey">
        <h2 className="text-lg font-semibold">Featured deals</h2>{" "}
        </div>

        <div className='flex flex-row flex-wrap mx-auto px-8'>
          {
            simplifiedData?.map((deal) => {
              return (
                  <SmallDealItem deal={deal} key={deal.name}/>
              )
            })
          }
        
         
        </div>
    </div>
  )
}
