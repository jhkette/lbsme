import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSubscriptionsSummaryQueryVariables = Types.Exact<{
  from: Types.Scalars['String']['input'];
  to: Types.Scalars['String']['input'];
}>;


export type GetSubscriptionsSummaryQuery = { __typename?: 'Query', getSubscriptionsSummary: { __typename?: 'SubscriptionsSummaryResult', totalSpent: number, usersAverageSpent?: number | null, currency?: string | null, categories: Array<{ __typename?: 'SubscriptionCategory', icon?: string | null, name: string, share?: number | null, spent: number, usersAverage: number, usersShare: number }> } };


export const GetSubscriptionsSummaryDocument = gql`
    query getSubscriptionsSummary($from: String!, $to: String!) {
  getSubscriptionsSummary(from: $from, to: $to) {
    totalSpent
    usersAverageSpent
    currency
    categories {
      icon
      name
      share
      spent
      usersAverage
      usersShare
    }
  }
}
    `;

/**
 * __useGetSubscriptionsSummaryQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionsSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionsSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionsSummaryQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useGetSubscriptionsSummaryQuery(baseOptions: Apollo.QueryHookOptions<GetSubscriptionsSummaryQuery, GetSubscriptionsSummaryQueryVariables> & ({ variables: GetSubscriptionsSummaryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubscriptionsSummaryQuery, GetSubscriptionsSummaryQueryVariables>(GetSubscriptionsSummaryDocument, options);
      }
export function useGetSubscriptionsSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubscriptionsSummaryQuery, GetSubscriptionsSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubscriptionsSummaryQuery, GetSubscriptionsSummaryQueryVariables>(GetSubscriptionsSummaryDocument, options);
        }
// @ts-ignore
export function useGetSubscriptionsSummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSubscriptionsSummaryQuery, GetSubscriptionsSummaryQueryVariables>): Apollo.UseSuspenseQueryResult<GetSubscriptionsSummaryQuery, GetSubscriptionsSummaryQueryVariables>;
export function useGetSubscriptionsSummarySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubscriptionsSummaryQuery, GetSubscriptionsSummaryQueryVariables>): Apollo.UseSuspenseQueryResult<GetSubscriptionsSummaryQuery | undefined, GetSubscriptionsSummaryQueryVariables>;
export function useGetSubscriptionsSummarySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubscriptionsSummaryQuery, GetSubscriptionsSummaryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubscriptionsSummaryQuery, GetSubscriptionsSummaryQueryVariables>(GetSubscriptionsSummaryDocument, options);
        }
export type GetSubscriptionsSummaryQueryHookResult = ReturnType<typeof useGetSubscriptionsSummaryQuery>;
export type GetSubscriptionsSummaryLazyQueryHookResult = ReturnType<typeof useGetSubscriptionsSummaryLazyQuery>;
export type GetSubscriptionsSummarySuspenseQueryHookResult = ReturnType<typeof useGetSubscriptionsSummarySuspenseQuery>;
export type GetSubscriptionsSummaryQueryResult = Apollo.QueryResult<GetSubscriptionsSummaryQuery, GetSubscriptionsSummaryQueryVariables>;