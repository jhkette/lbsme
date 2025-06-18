import { ApolloClient, InMemoryCache, NormalizedCacheObject, from } from "@apollo/client";
import createApolloLink from "./createApolloLink"; // Adjust path as needed

// Create the Apollo Client
const createApolloClient = () => {
  const link = createApolloLink();
  
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache({
      // Optional: Add cache configuration
      typePolicies: {
        // Add type policies if needed
      },
    }),
    // Optional: Add default options
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
    // Enable dev tools in development
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
