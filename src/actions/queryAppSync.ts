import {getToken} from "@/actions/getToken"


export const queryAppSync = async (query: string, variables: Record<string, any> = {}) => {
  const url = process.env.REACT_APP_AWS_APPSYNC_URL!;
  const token = await getToken(); // this should return your JWT

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