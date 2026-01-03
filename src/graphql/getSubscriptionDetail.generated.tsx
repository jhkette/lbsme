import * as Types from "../graphql-types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetSubscriptionQueryVariables = Types.Exact<{
	id: Types.Scalars["String"]["input"];
}>;

export type GetSubscriptionQuery = {
	__typename?: "Query";
	getSubscription: {
		__typename?: "SubscriptionDetails";
		freeTrial: boolean;
		isManual: boolean;
		status: Types.SubscriptionStatusEnum;
		displayName?: string | null;
		paymentMethod?: string | null;
		subscriptionId: string;
		cancellationStatus?: Types.CancellationStatusEnum | null;
		type: Types.SubscriptionPriceTypeEnum;
		category: {
			__typename?: "AssignedCategory";
			category: string;
			PK: string;
			searchCategory: string;
			searchSubCategory: string;
			SK: string;
			subCategory: string;
		};
		costs: {
			__typename?: "SubscriptionCosts";
			amount: number;
			monthly: number;
			priceChange: number;
			totalRemaining?: number | null;
			average_monthly?: number | null;
			totalSpent: number;
			yearly: number;
			saveUp: number;
		};
		dates: {
			__typename?: "SubscriptionDates";
			endsInDays: number;
			endsInPercent?: number | null;
			lastPaymentDate: string;
			renewalDate: string;
			contractEndDate?: string | null;
		};
		merchant: {
			__typename?: "Merchant";
			icon?: string | null;
			id: string;
			name: string;
		};
		transactions?: Array<{
			__typename?: "TransactionData";
			accountID?: string | null;
			bookingTime?: string | null;
			budId?: string | null;
			title?: string | null;
			transactionId?: string | null;
			amount?: {
				__typename?: "TransactionAmount";
				amount?: number | null;
				currency?: string | null;
			} | null;
			provider?: {
				__typename?: "ProviderData";
				id?: string | null;
				name?: string | null;
			} | null;
		} | null> | null;
	};
};

export const GetSubscriptionDocument = gql`
    query getSubscription($id: String!) {
  getSubscription(id: $id) {
    category {
      category
      PK
      searchCategory
      searchSubCategory
      SK
      subCategory
    }
    costs {
      amount
      monthly
      priceChange
      totalRemaining
      average_monthly
      totalSpent
      yearly
      saveUp
      priceChange
    }
    dates {
      endsInDays
      endsInPercent
      lastPaymentDate
      renewalDate
      contractEndDate
    }
    freeTrial
    isManual
    status
    merchant {
      icon
      id
      name
    }
    displayName
    paymentMethod
    subscriptionId
    cancellationStatus
    type
    transactions {
      accountID
      bookingTime
      budId
      title
      transactionId
      amount {
        amount
        currency
      }
      provider {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetSubscriptionQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSubscriptionQuery(
	baseOptions: Apollo.QueryHookOptions<
		GetSubscriptionQuery,
		GetSubscriptionQueryVariables
	> &
		(
			| { variables: GetSubscriptionQueryVariables; skip?: boolean }
			| { skip: boolean }
		),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetSubscriptionQuery, GetSubscriptionQueryVariables>(
		GetSubscriptionDocument,
		options,
	);
}
export function useGetSubscriptionLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetSubscriptionQuery,
		GetSubscriptionQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		GetSubscriptionQuery,
		GetSubscriptionQueryVariables
	>(GetSubscriptionDocument, options);
}
// @ts-ignore
export function useGetSubscriptionSuspenseQuery(
	baseOptions?: Apollo.SuspenseQueryHookOptions<
		GetSubscriptionQuery,
		GetSubscriptionQueryVariables
	>,
): Apollo.UseSuspenseQueryResult<
	GetSubscriptionQuery,
	GetSubscriptionQueryVariables
>;
export function useGetSubscriptionSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetSubscriptionQuery,
				GetSubscriptionQueryVariables
		  >,
): Apollo.UseSuspenseQueryResult<
	GetSubscriptionQuery | undefined,
	GetSubscriptionQueryVariables
>;
export function useGetSubscriptionSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetSubscriptionQuery,
				GetSubscriptionQueryVariables
		  >,
) {
	const options =
		baseOptions === Apollo.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<
		GetSubscriptionQuery,
		GetSubscriptionQueryVariables
	>(GetSubscriptionDocument, options);
}
export type GetSubscriptionQueryHookResult = ReturnType<
	typeof useGetSubscriptionQuery
>;
export type GetSubscriptionLazyQueryHookResult = ReturnType<
	typeof useGetSubscriptionLazyQuery
>;
export type GetSubscriptionSuspenseQueryHookResult = ReturnType<
	typeof useGetSubscriptionSuspenseQuery
>;
export type GetSubscriptionQueryResult = Apollo.QueryResult<
	GetSubscriptionQuery,
	GetSubscriptionQueryVariables
>;
