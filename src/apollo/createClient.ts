import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import createApolloLink from "./createApolloLink"; 

// Create Apollo Client
const createApolloClient = () => {
  const link = createApolloLink();
  
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache({

    }),
   
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
   
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
};

// Export a singleton instance
let apolloClient: ApolloClient<NormalizedCacheObject>;

export const getApolloClient = () => {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  return apolloClient;
};
