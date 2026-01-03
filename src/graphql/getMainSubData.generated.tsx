import * as Types from "../graphql-types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetSubscriptionsQueryVariables = Types.Exact<{
	status: Types.SubscriptionStatusEnum;
}>;

export type GetSubscriptionsQuery = {
	__typename?: "Query";
	getSubscriptions?: {
		__typename?: "GetSubscriptionsResult";
		subscriptions?: Array<{
			__typename?: "Subscription";
			displayName?: string | null;
			cancellationStatus?: Types.CancellationStatusEnum | null;
			monthlyCost: number;
			paymentMethod?: string | null;
			priceChange: number;
			providerName: string;
			subscriptionId: string;
			type: Types.SubscriptionPriceTypeEnum;
			saveUp: number;
			merchant: {
				__typename?: "Merchant";
				icon?: string | null;
				id: string;
				name: string;
			};
			category?: {
				__typename?: "AssignedCategory";
				PK: string;
				SK: string;
				category: string;
				searchCategory: string;
				searchSubCategory: string;
				subCategory: string;
			} | null;
			dates: {
				__typename?: "SubscriptionDates";
				endsInDays: number;
				endsInPercent?: number | null;
				lastPaymentDate: string;
				renewalDate: string;
			};
		}> | null;
	} | null;
};

export const GetSubscriptionsDocument = gql`
    query getSubscriptions($status: SubscriptionStatusEnum!) {
  getSubscriptions(status: $status) {
    subscriptions {
      merchant {
        icon
        id
        name
      }
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
      displayName
      cancellationStatus
      monthlyCost
      paymentMethod
      priceChange
      providerName
      subscriptionId
      type
      saveUp
    }
  }
}
    `;

/**
 * __useGetSubscriptionsQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetSubscriptionsQuery(
	baseOptions: Apollo.QueryHookOptions<
		GetSubscriptionsQuery,
		GetSubscriptionsQueryVariables
	> &
		(
			| { variables: GetSubscriptionsQueryVariables; skip?: boolean }
			| { skip: boolean }
		),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>(
		GetSubscriptionsDocument,
		options,
	);
}
export function useGetSubscriptionsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetSubscriptionsQuery,
		GetSubscriptionsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		GetSubscriptionsQuery,
		GetSubscriptionsQueryVariables
	>(GetSubscriptionsDocument, options);
}
// @ts-ignore
export function useGetSubscriptionsSuspenseQuery(
	baseOptions?: Apollo.SuspenseQueryHookOptions<
		GetSubscriptionsQuery,
		GetSubscriptionsQueryVariables
	>,
): Apollo.UseSuspenseQueryResult<
	GetSubscriptionsQuery,
	GetSubscriptionsQueryVariables
>;
export function useGetSubscriptionsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetSubscriptionsQuery,
				GetSubscriptionsQueryVariables
		  >,
): Apollo.UseSuspenseQueryResult<
	GetSubscriptionsQuery | undefined,
	GetSubscriptionsQueryVariables
>;
export function useGetSubscriptionsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetSubscriptionsQuery,
				GetSubscriptionsQueryVariables
		  >,
) {
	const options =
		baseOptions === Apollo.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<
		GetSubscriptionsQuery,
		GetSubscriptionsQueryVariables
	>(GetSubscriptionsDocument, options);
}
export type GetSubscriptionsQueryHookResult = ReturnType<
	typeof useGetSubscriptionsQuery
>;
export type GetSubscriptionsLazyQueryHookResult = ReturnType<
	typeof useGetSubscriptionsLazyQuery
>;
export type GetSubscriptionsSuspenseQueryHookResult = ReturnType<
	typeof useGetSubscriptionsSuspenseQuery
>;
export type GetSubscriptionsQueryResult = Apollo.QueryResult<
	GetSubscriptionsQuery,
	GetSubscriptionsQueryVariables
>;
