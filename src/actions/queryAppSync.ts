import {getToken} from "@/actions/getToken"

import { useQuery } from "@tanstack/react-query";
// import { getTokenClient } from "./getTokenClient";
export const queryAppSync = async (query: string, variables: Record<string, any> = {}) => {
  const url = process.env.REACT_APP_AWS_APPSYNC_URL!;
  const token = await getToken() as string; // this should return your JWT
  console.log(token, "query token")
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // <- AppSync expects it in the Authorization header
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();
  if (!response.ok || json.errors) {
    console.error("AppSync error:", json.errors);
    throw new Error(`GraphQL error: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
};


export const useAppSyncQuery = (query: string, variables?: Record<string, any>) => {
  return useQuery({
    queryKey: [query, variables],
    queryFn: () => queryAppSync(query, variables),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};