import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetFeaturedDealsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetFeaturedDealsQuery = { __typename?: 'Query', getFeaturedDeals: Array<{ __typename?: 'FeaturedDealsResult', name: string, icon: string, saveUp?: number | null, category: Array<{ __typename?: 'SubCategoryResult', name: string, PK: string, SK: string, searchName: string }> }> };


export const GetFeaturedDealsDocument = gql`
    query getFeaturedDeals {
  getFeaturedDeals {
    name
    icon
    saveUp
    category {
      name
      PK
      SK
      searchName
    }
  }
}
    `;

/**
 * __useGetFeaturedDealsQuery__
 *
 * To run a query within a React component, call `useGetFeaturedDealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeaturedDealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeaturedDealsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeaturedDealsQuery(baseOptions?: Apollo.QueryHookOptions<GetFeaturedDealsQuery, GetFeaturedDealsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeaturedDealsQuery, GetFeaturedDealsQueryVariables>(GetFeaturedDealsDocument, options);
      }
export function useGetFeaturedDealsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeaturedDealsQuery, GetFeaturedDealsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeaturedDealsQuery, GetFeaturedDealsQueryVariables>(GetFeaturedDealsDocument, options);
        }
export function useGetFeaturedDealsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFeaturedDealsQuery, GetFeaturedDealsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFeaturedDealsQuery, GetFeaturedDealsQueryVariables>(GetFeaturedDealsDocument, options);
        }
export type GetFeaturedDealsQueryHookResult = ReturnType<typeof useGetFeaturedDealsQuery>;
export type GetFeaturedDealsLazyQueryHookResult = ReturnType<typeof useGetFeaturedDealsLazyQuery>;
export type GetFeaturedDealsSuspenseQueryHookResult = ReturnType<typeof useGetFeaturedDealsSuspenseQuery>;
export type GetFeaturedDealsQueryResult = Apollo.QueryResult<GetFeaturedDealsQuery, GetFeaturedDealsQueryVariables>;