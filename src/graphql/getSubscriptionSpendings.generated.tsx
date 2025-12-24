import * as Types from "../graphql-types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetSubscriptionSpendingsQueryVariables = Types.Exact<{
	from: Types.Scalars["String"]["input"];
	to: Types.Scalars["String"]["input"];
	category: Types.Scalars["String"]["input"];
}>;

export type GetSubscriptionSpendingsQuery = {
	__typename?: "Query";
	getSubscriptionSpendings: {
		__typename?: "SubscriptionsSpendingsResult";
		currency?: string | null;
		subscriptionsCount: number;
		barChartData: {
			__typename?: "BarChartData";
			averageCost: number;
			maxCost: number;
			middleCost: number;
			data: Array<{ __typename?: "ChartData"; period: string; value: number }>;
		};
		cost: {
			__typename?: "Cost";
			monthly: number;
			weekly: number;
			yearly: number;
		};
		lineChartData: Array<{
			__typename?: "ChartData";
			period: string;
			value: number;
		}>;
		potentialSavings: {
			__typename?: "Cost";
			monthly: number;
			weekly: number;
			yearly: number;
		};
		spendingsDifference: {
			__typename?: "SpendingsDifference";
			dataAvailable: boolean;
			value: number;
		};
		subscriptions?: Array<{
			__typename?: "SubscriptionDetails";
			freeTrial: boolean;
			paymentMethod?: string | null;
			providerName?: string | null;
			subscriptionId: string;
			type: Types.SubscriptionPriceTypeEnum;
			category: {
				__typename?: "AssignedCategory";
				PK: string;
				SK: string;
				category: string;
				searchCategory: string;
				searchSubCategory: string;
				subCategory: string;
			};
			dates: {
				__typename?: "SubscriptionDates";
				endsInDays: number;
				endsInPercent?: number | null;
				lastPaymentDate: string;
				renewalDate: string;
			};
			merchant: {
				__typename?: "Merchant";
				icon?: string | null;
				id: string;
				name: string;
			};
			costs: {
				__typename?: "SubscriptionCosts";
				amount: number;
				average_monthly?: number | null;
				monthly: number;
				priceChange: number;
				totalSpent: number;
				yearly: number;
			};
		} | null> | null;
	};
};

export type GetUserCategoriesQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type GetUserCategoriesQuery = {
	__typename?: "Query";
	getUserCategories: Array<{
		__typename?: "UserCategoryResult";
		PK: string;
		SK: string;
		name: string;
		searchName: string;
	}>;
};

export type GetUpcomingRenewalsQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type GetUpcomingRenewalsQuery = {
	__typename?: "Query";
	getUpcomingRenewals: Array<{
		__typename?: "UpcomingRenewals";
		amount: number;
		currency: string;
		provider: string;
		dates: {
			__typename?: "Dates";
			lastPayment?: string | null;
			renewal: string;
			renewalTimestamp: number;
		};
		merchant: {
			__typename?: "Merchant";
			icon?: string | null;
			id: string;
			name: string;
		};
	}>;
};

export type GetTopDealsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetTopDealsQuery = {
	__typename?: "Query";
	getTopDeals: Array<{
		__typename?: "GetDealsResult";
		currency: string;
		description: string;
		logo: string;
		name: string;
		price: number;
		url: string;
	}>;
};

export const GetSubscriptionSpendingsDocument = gql`
    query getSubscriptionSpendings($from: String!, $to: String!, $category: String!) {
  getSubscriptionSpendings(from: $from, to: $to, category: $category) {
    barChartData {
      averageCost
      data {
        period
        value
      }
      maxCost
      middleCost
    }
    cost {
      monthly
      weekly
      yearly
    }
    currency
    lineChartData {
      period
      value
    }
    potentialSavings {
      monthly
      weekly
      yearly
    }
    spendingsDifference {
      dataAvailable
      value
    }
    subscriptionsCount
    subscriptions {
      category {
        PK
        SK
        category
        searchCategory
        searchSubCategory
        subCategory
      }
      dates {
        endsInDays
        endsInPercent
        lastPaymentDate
        renewalDate
      }
      freeTrial
      merchant {
        icon
        id
        name
      }
      costs {
        amount
        average_monthly
        monthly
        priceChange
        totalSpent
        yearly
      }
      paymentMethod
      providerName
      subscriptionId
      type
    }
  }
}
    `;

/**
 * __useGetSubscriptionSpendingsQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionSpendingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionSpendingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionSpendingsQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetSubscriptionSpendingsQuery(
	baseOptions: Apollo.QueryHookOptions<
		GetSubscriptionSpendingsQuery,
		GetSubscriptionSpendingsQueryVariables
	> &
		(
			| { variables: GetSubscriptionSpendingsQueryVariables; skip?: boolean }
			| { skip: boolean }
		),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<
		GetSubscriptionSpendingsQuery,
		GetSubscriptionSpendingsQueryVariables
	>(GetSubscriptionSpendingsDocument, options);
}
export function useGetSubscriptionSpendingsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetSubscriptionSpendingsQuery,
		GetSubscriptionSpendingsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		GetSubscriptionSpendingsQuery,
		GetSubscriptionSpendingsQueryVariables
	>(GetSubscriptionSpendingsDocument, options);
}
export function useGetSubscriptionSpendingsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetSubscriptionSpendingsQuery,
				GetSubscriptionSpendingsQueryVariables
		  >,
) {
	const options =
		baseOptions === Apollo.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<
		GetSubscriptionSpendingsQuery,
		GetSubscriptionSpendingsQueryVariables
	>(GetSubscriptionSpendingsDocument, options);
}
export type GetSubscriptionSpendingsQueryHookResult = ReturnType<
	typeof useGetSubscriptionSpendingsQuery
>;
export type GetSubscriptionSpendingsLazyQueryHookResult = ReturnType<
	typeof useGetSubscriptionSpendingsLazyQuery
>;
export type GetSubscriptionSpendingsSuspenseQueryHookResult = ReturnType<
	typeof useGetSubscriptionSpendingsSuspenseQuery
>;
export type GetSubscriptionSpendingsQueryResult = Apollo.QueryResult<
	GetSubscriptionSpendingsQuery,
	GetSubscriptionSpendingsQueryVariables
>;
export const GetUserCategoriesDocument = gql`
    query getUserCategories {
  getUserCategories {
    PK
    SK
    name
    searchName
  }
}
    `;

/**
 * __useGetUserCategoriesQuery__
 *
 * To run a query within a React component, call `useGetUserCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCategoriesQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetUserCategoriesQuery,
		GetUserCategoriesQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<
		GetUserCategoriesQuery,
		GetUserCategoriesQueryVariables
	>(GetUserCategoriesDocument, options);
}
export function useGetUserCategoriesLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetUserCategoriesQuery,
		GetUserCategoriesQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		GetUserCategoriesQuery,
		GetUserCategoriesQueryVariables
	>(GetUserCategoriesDocument, options);
}
export function useGetUserCategoriesSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetUserCategoriesQuery,
				GetUserCategoriesQueryVariables
		  >,
) {
	const options =
		baseOptions === Apollo.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<
		GetUserCategoriesQuery,
		GetUserCategoriesQueryVariables
	>(GetUserCategoriesDocument, options);
}
export type GetUserCategoriesQueryHookResult = ReturnType<
	typeof useGetUserCategoriesQuery
>;
export type GetUserCategoriesLazyQueryHookResult = ReturnType<
	typeof useGetUserCategoriesLazyQuery
>;
export type GetUserCategoriesSuspenseQueryHookResult = ReturnType<
	typeof useGetUserCategoriesSuspenseQuery
>;
export type GetUserCategoriesQueryResult = Apollo.QueryResult<
	GetUserCategoriesQuery,
	GetUserCategoriesQueryVariables
>;
export const GetUpcomingRenewalsDocument = gql`
    query getUpcomingRenewals {
  getUpcomingRenewals {
    amount
    currency
    dates {
      lastPayment
      renewal
      renewalTimestamp
    }
    merchant {
      icon
      id
      name
    }
    provider
  }
}
    `;

/**
 * __useGetUpcomingRenewalsQuery__
 *
 * To run a query within a React component, call `useGetUpcomingRenewalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingRenewalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingRenewalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUpcomingRenewalsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetUpcomingRenewalsQuery,
		GetUpcomingRenewalsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<
		GetUpcomingRenewalsQuery,
		GetUpcomingRenewalsQueryVariables
	>(GetUpcomingRenewalsDocument, options);
}
export function useGetUpcomingRenewalsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetUpcomingRenewalsQuery,
		GetUpcomingRenewalsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		GetUpcomingRenewalsQuery,
		GetUpcomingRenewalsQueryVariables
	>(GetUpcomingRenewalsDocument, options);
}
export function useGetUpcomingRenewalsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetUpcomingRenewalsQuery,
				GetUpcomingRenewalsQueryVariables
		  >,
) {
	const options =
		baseOptions === Apollo.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<
		GetUpcomingRenewalsQuery,
		GetUpcomingRenewalsQueryVariables
	>(GetUpcomingRenewalsDocument, options);
}
export type GetUpcomingRenewalsQueryHookResult = ReturnType<
	typeof useGetUpcomingRenewalsQuery
>;
export type GetUpcomingRenewalsLazyQueryHookResult = ReturnType<
	typeof useGetUpcomingRenewalsLazyQuery
>;
export type GetUpcomingRenewalsSuspenseQueryHookResult = ReturnType<
	typeof useGetUpcomingRenewalsSuspenseQuery
>;
export type GetUpcomingRenewalsQueryResult = Apollo.QueryResult<
	GetUpcomingRenewalsQuery,
	GetUpcomingRenewalsQueryVariables
>;
export const GetTopDealsDocument = gql`
    query getTopDeals {
  getTopDeals {
    currency
    description
    logo
    name
    price
    url
  }
}
    `;

/**
 * __useGetTopDealsQuery__
 *
 * To run a query within a React component, call `useGetTopDealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopDealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopDealsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopDealsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetTopDealsQuery,
		GetTopDealsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetTopDealsQuery, GetTopDealsQueryVariables>(
		GetTopDealsDocument,
		options,
	);
}
export function useGetTopDealsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetTopDealsQuery,
		GetTopDealsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<GetTopDealsQuery, GetTopDealsQueryVariables>(
		GetTopDealsDocument,
		options,
	);
}
export function useGetTopDealsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetTopDealsQuery,
				GetTopDealsQueryVariables
		  >,
) {
	const options =
		baseOptions === Apollo.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<GetTopDealsQuery, GetTopDealsQueryVariables>(
		GetTopDealsDocument,
		options,
	);
}
export type GetTopDealsQueryHookResult = ReturnType<typeof useGetTopDealsQuery>;
export type GetTopDealsLazyQueryHookResult = ReturnType<
	typeof useGetTopDealsLazyQuery
>;
export type GetTopDealsSuspenseQueryHookResult = ReturnType<
	typeof useGetTopDealsSuspenseQuery
>;
export type GetTopDealsQueryResult = Apollo.QueryResult<
	GetTopDealsQuery,
	GetTopDealsQueryVariables
>;
