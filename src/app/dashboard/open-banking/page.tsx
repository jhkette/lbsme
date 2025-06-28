"use client"
import React from 'react'
import { useGetProvidersQuery } from '@/graphql/getProviders.generated';

export default function Openbanking() {

   const { loading, error, data, refetch } = useGetProvidersQuery({
    variables: { name: "barclays" },
    fetchPolicy: "cache-and-network",
  });
  console.log(data, "OPEN BANKING DATA")
  return (
    <div>
        
    </div>
  )
}
