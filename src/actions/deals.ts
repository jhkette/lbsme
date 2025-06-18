
import { queryAppSync, useAppSyncQuery } from "./queryAppSync";

export const fetchTopDeals = async (from: string, to: string): Promise<any> => {
  const query = `
   query getSubscriptions {
  getSubscriptions(status: ACTIVE) {
    subscriptions {
     merchant {
        icon
        id
        name
      }
      displayName
       cancellationStatus
      displayName
      monthlyCost
      paymentMethod
      priceChange
      providerName
      subscriptionId
      type
      saveUp
    }
  }
}`;

  const variables = { from, to };

  try {
    const data = await queryAppSync(query, variables); // 👈 pass variables here
    return data;
  } catch (error) {
    console.error("Failed to fetch top deals:", error);
    throw error;
  }
};