import { useEffect, useState } from "react";

import { Hub } from "aws-amplify/utils";

import { HubCallback } from "@aws-amplify/core";

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import HubEvent from "@/interfaces/HubEvent";
import createApolloLink from "./createApolloLink";

const createClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache(),
  });
};

const useApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const [client] = useState<ApolloClient<NormalizedCacheObject>>(() =>
    createClient()
  );

  useEffect(() => {
    client.setLink(createApolloLink());
    const handleAuthEvents: HubCallback = ({ payload: { event } }): void => {
      if (event === HubEvent.SignOut) {
        client.cache.reset();
      }
    };

    const hubListener = Hub.listen("auth", handleAuthEvents);
    return () => {
      hubListener(); // Return a function to remove the listener when the component unmounts
    };
  }, [client]);

  return client;
};

export default useApolloClient;
