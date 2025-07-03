"use client"
import React from 'react'
import {useGetUserAuthGatewayQuery} from "@/graphql/getUserAuthGateway.generated";
export default function OpenBankingConnect({id}: {id: string}) {
  console.log("OpenBankingConnect", id);
  if(id.length != 0) {
      const { data, loading, error, refetch, networkStatus } = useGetUserAuthGatewayQuery({
    variables: {
      provider: id,
    },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  console.log(data, loading, error, networkStatus);
}
 
  return (
    <div>openBankingConnect</div>
  )
}
