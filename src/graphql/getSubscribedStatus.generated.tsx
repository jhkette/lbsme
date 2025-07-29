import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StatusQuery = { __typename?: 'Query', getSubscribedStatus: { __typename?: 'getSubscribedStatusResult', subscribed?: boolean | null } };


export const StatusDocument = gql`
    query status {
  getSubscribedStatus {
    subscribed
  }
}
    `;

/**
 * __useStatusQuery__
 *
 * To run a query within a React component, call `useStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useStatusQuery(baseOptions?: Apollo.QueryHookOptions<StatusQuery, StatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatusQuery, StatusQueryVariables>(StatusDocument, options);
      }
export function useStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatusQuery, StatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatusQuery, StatusQueryVariables>(StatusDocument, options);
        }
export function useStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StatusQuery, StatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StatusQuery, StatusQueryVariables>(StatusDocument, options);
        }
export type StatusQueryHookResult = ReturnType<typeof useStatusQuery>;
export type StatusLazyQueryHookResult = ReturnType<typeof useStatusLazyQuery>;
export type StatusSuspenseQueryHookResult = ReturnType<typeof useStatusSuspenseQuery>;
export type StatusQueryResult = Apollo.QueryResult<StatusQuery, StatusQueryVariables>;