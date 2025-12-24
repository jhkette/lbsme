export interface SubscriptionDetails {
	__typename: "SubscriptionDetails";
	category: AssignedCategory;
	costs: SubscriptionCosts;
	dates: SubscriptionDates;
	freeTrial: boolean;
	isManual: boolean;
	status: string;
	merchant: Merchant;
	displayName: string;
	paymentMethod: string;
	subscriptionId: string;
	cancellationStatus: string | null;
	type: string;
	transactions: TransactionData[];
}

export interface AssignedCategory {
	__typename: "AssignedCategory";
	category: string;
	PK: string;
	searchCategory: string;
	searchSubCategory: string;
	SK: string;
	subCategory: string;
}

export interface SubscriptionCosts {
	__typename: "SubscriptionCosts";
	amount: number;
	monthly: number;
	priceChange: number;
	totalRemaining: number | null;
	average_monthly: number;
	totalSpent: number;
	yearly: number;
	saveUp: number;
}

export interface SubscriptionDates {
	__typename: "SubscriptionDates";
	endsInDays: number;
	endsInPercent: number;
	lastPaymentDate: string; // ISO date string
	renewalDate: string; // ISO date string
	contractEndDate: string | null;
}

export interface Merchant {
	__typename: "Merchant";
	icon: string;
	id: string;
	name: string;
}

export interface TransactionData {
	__typename: "TransactionData";
	accountID: string;
	bookingTime: string; // ISO date string
	budId: string;
	title: string;
	transactionId: string;
	amount: TransactionAmount;
	provider: ProviderData;
}

export interface TransactionAmount {
	__typename: "TransactionAmount";
	amount: number;
	currency: string;
}

export interface ProviderData {
	__typename: "ProviderData";
	id: string;
	name: string;
}
