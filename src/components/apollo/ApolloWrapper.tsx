'use client';

import { useEffect, useState } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { getApolloClient } from '@/apollo/createClient';

// This component wraps the ApolloProvider around the layout componenet - it is in a
// seperate component as it needs to run on a client component.
export default function ApolloProviderWrapper({ 
  children,
}: {
  children: React.ReactNode;
}) {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    const apolloClient = getApolloClient();
    setClient(apolloClient);
  }, []);

  if (!client) return null; 

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}