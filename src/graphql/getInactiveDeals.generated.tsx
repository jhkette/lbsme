import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInactiveSubscriptionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetInactiveSubscriptionsQuery = { __typename?: 'Query', getSubscriptions?: { __typename?: 'GetSubscriptionsResult', subscriptions?: Array<{ __typename?: 'Subscription', displayName?: string | null, cancellationStatus?: Types.CancellationStatusEnum | null, monthlyCost: number, paymentMethod?: string | null, priceChange: number, providerName: string, subscriptionId: string, type: Types.SubscriptionPriceTypeEnum, saveUp: number, merchant: { __typename?: 'Merchant', icon?: string | null, id: string, name: string }, category?: { __typename?: 'AssignedCategory', PK: string, SK: string, category: string, searchCategory: string, searchSubCategory: string, subCategory: string } | null, dates: { __typename?: 'SubscriptionDates', endsInDays: number, endsInPercent?: number | null, lastPaymentDate: string, renewalDate: string } }> | null } | null };


export const GetInactiveSubscriptionsDocument = gql`
    query getInactiveSubscriptions {
  getSubscriptions(status: DEACTIVE) {
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
 * __useGetInactiveSubscriptionsQuery__
 *
 * To run a query within a React component, call `useGetInactiveSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInactiveSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInactiveSubscriptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInactiveSubscriptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetInactiveSubscriptionsQuery, GetInactiveSubscriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInactiveSubscriptionsQuery, GetInactiveSubscriptionsQueryVariables>(GetInactiveSubscriptionsDocument, options);
      }
export function useGetInactiveSubscriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInactiveSubscriptionsQuery, GetInactiveSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInactiveSubscriptionsQuery, GetInactiveSubscriptionsQueryVariables>(GetInactiveSubscriptionsDocument, options);
        }
export function useGetInactiveSubscriptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetInactiveSubscriptionsQuery, GetInactiveSubscriptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetInactiveSubscriptionsQuery, GetInactiveSubscriptionsQueryVariables>(GetInactiveSubscriptionsDocument, options);
        }
export type GetInactiveSubscriptionsQueryHookResult = ReturnType<typeof useGetInactiveSubscriptionsQuery>;
export type GetInactiveSubscriptionsLazyQueryHookResult = ReturnType<typeof useGetInactiveSubscriptionsLazyQuery>;
export type GetInactiveSubscriptionsSuspenseQueryHookResult = ReturnType<typeof useGetInactiveSubscriptionsSuspenseQuery>;
export type GetInactiveSubscriptionsQueryResult = Apollo.QueryResult<GetInactiveSubscriptionsQuery, GetInactiveSubscriptionsQueryVariables>;