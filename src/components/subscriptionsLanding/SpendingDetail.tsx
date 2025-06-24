import React from 'react'
import { Subscription } from '@/interfaces/Subscription'
import { useGetSubscriptionQuery } from '@/graphql/getSubscriptionDetail.generated'
interface SpendingDetailProps{
    sub: Subscription
}



export default function SpendingDetail(sub:  SpendingDetailProps) {

     const { loading, error, data, refetch } = useGetSubscriptionQuery({
        variables: {id: sub.sub.subscriptionId},
        // Optional: Add error policy
        errorPolicy: "all",
        // Optional: Cache policy
        fetchPolicy: "cache-and-network",
        // Optional: Poll for updates every 30 seconds
        // pollInterval: 30000,
      });

      console.log(data?.getSubscription.transactions)

      const currentYear = new Date().getFullYear();

      if(loading){
        return null
      }

// Sum the amounts of transactions from the current year
const totalThisYear = (data?.getSubscription?.transactions ?? [])
  .filter((tx): tx is NonNullable<typeof tx> => !!tx && !!tx.bookingTime)
  .filter(tx => new Date(tx.bookingTime as string).getFullYear() === currentYear)
  .reduce((sum, tx) => sum + (tx.amount && tx.amount.amount ? tx.amount.amount : 0), 0);

  return (
    <div>{totalThisYear.toFixed(2)}</div>
  )
}
