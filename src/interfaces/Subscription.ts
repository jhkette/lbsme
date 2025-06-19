export type Subscription = {
  merchant: {
    __typename: "Merchant";
    icon: string;
    id: string;
    name: string;
  };
  category: {
    __typename: "AssignedCategory";
    PK: string;
    SK: string;
    category: string;
    searchCategory: string;
    searchSubCategory: string;
    subCategory: string;
  };
  dates: {
    __typename: "SubscriptionDates";
    endsInDays: number;
    endsInPercent: number;
    lastPaymentDate: string; // ISO date string
    renewalDate: string;     // ISO date string
  };
  displayName: string;
  cancellationStatus: string | null;
  monthlyCost: number;
  paymentMethod: string;
  priceChange: number;
  providerName: string;
  subscriptionId: string;
  type: "weekly" | "monthly" | "yearly" | string; // can extend as needed
  saveUp: number;
  __typename: "Subscription";
};