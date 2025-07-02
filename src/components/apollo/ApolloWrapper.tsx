'use client';

import { useEffect, useState } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { getApolloClient } from '@/apollo/createClient';

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

  if (!client) return null; // or a loader/spinner if preferred

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}