import {queryAppSync} from "./queryAppSync"

// First, define TypeScript interfaces for the response data
interface Deal {

  url: string;
}

interface GetTopDealsResponse {
  getTopDeals: Deal[];
}

// Then create the function using your queryAppSync
export const fetchTopDeals = async (): Promise<Deal[]> => {
  const query = `
  query getProviderlessUserAuthGateway {
  getProviderlessUserAuthGateway {
    url
  }
}
  `;

  try {
    const data = await queryAppSync(query);
    return data
  } catch (error) {
    console.error('Failed to fetch top deals:', error);
    throw error; // Re-throw or handle as needed
  }
};


