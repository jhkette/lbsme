import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MerchantQueryQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type MerchantQueryQuery = { __typename?: 'Query', getMerchant?: Array<{ __typename?: 'MerchantResultV2', SK: string, id: string, name: string, subCategory: string, category?: { __typename?: 'CategoryResult', name: string, icon: string } | null }> | null };

export type GetSubCategoryQueryVariables = Types.Exact<{
  SK: Types.Scalars['ID']['input'];
}>;


export type GetSubCategoryQuery = { __typename?: 'Query', getSubCategory: Array<{ __typename?: 'SubCategoryResult', searchName: string, name: string, PK: string, SK: string }> };


export const MerchantQueryDocument = gql`
    query MerchantQuery($filter: String) {
  getMerchant(filter: $filter) {
    SK
    id
    name
    subCategory
    category {
      name
      icon
    }
  }
}
    `;

/**
 * __useMerchantQueryQuery__
 *
 * To run a query within a React component, call `useMerchantQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMerchantQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMerchantQueryQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMerchantQueryQuery(baseOptions?: Apollo.QueryHookOptions<MerchantQueryQuery, MerchantQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MerchantQueryQuery, MerchantQueryQueryVariables>(MerchantQueryDocument, options);
      }
export function useMerchantQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MerchantQueryQuery, MerchantQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MerchantQueryQuery, MerchantQueryQueryVariables>(MerchantQueryDocument, options);
        }
// @ts-ignore
export function useMerchantQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MerchantQueryQuery, MerchantQueryQueryVariables>): Apollo.UseSuspenseQueryResult<MerchantQueryQuery, MerchantQueryQueryVariables>;
export function useMerchantQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MerchantQueryQuery, MerchantQueryQueryVariables>): Apollo.UseSuspenseQueryResult<MerchantQueryQuery | undefined, MerchantQueryQueryVariables>;
export function useMerchantQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MerchantQueryQuery, MerchantQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MerchantQueryQuery, MerchantQueryQueryVariables>(MerchantQueryDocument, options);
        }
export type MerchantQueryQueryHookResult = ReturnType<typeof useMerchantQueryQuery>;
export type MerchantQueryLazyQueryHookResult = ReturnType<typeof useMerchantQueryLazyQuery>;
export type MerchantQuerySuspenseQueryHookResult = ReturnType<typeof useMerchantQuerySuspenseQuery>;
export type MerchantQueryQueryResult = Apollo.QueryResult<MerchantQueryQuery, MerchantQueryQueryVariables>;
export const GetSubCategoryDocument = gql`
    query getSubCategory($SK: ID!) {
  getSubCategory(SK: $SK) {
    searchName
    name
    PK
    SK
  }
}
    `;

/**
 * __useGetSubCategoryQuery__
 *
 * To run a query within a React component, call `useGetSubCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubCategoryQuery({
 *   variables: {
 *      SK: // value for 'SK'
 *   },
 * });
 */
export function useGetSubCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetSubCategoryQuery, GetSubCategoryQueryVariables> & ({ variables: GetSubCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubCategoryQuery, GetSubCategoryQueryVariables>(GetSubCategoryDocument, options);
      }
export function useGetSubCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubCategoryQuery, GetSubCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubCategoryQuery, GetSubCategoryQueryVariables>(GetSubCategoryDocument, options);
        }
// @ts-ignore
export function useGetSubCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSubCategoryQuery, GetSubCategoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetSubCategoryQuery, GetSubCategoryQueryVariables>;
export function useGetSubCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubCategoryQuery, GetSubCategoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetSubCategoryQuery | undefined, GetSubCategoryQueryVariables>;
export function useGetSubCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubCategoryQuery, GetSubCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubCategoryQuery, GetSubCategoryQueryVariables>(GetSubCategoryDocument, options);
        }
export type GetSubCategoryQueryHookResult = ReturnType<typeof useGetSubCategoryQuery>;
export type GetSubCategoryLazyQueryHookResult = ReturnType<typeof useGetSubCategoryLazyQuery>;
export type GetSubCategorySuspenseQueryHookResult = ReturnType<typeof useGetSubCategorySuspenseQuery>;
export type GetSubCategoryQueryResult = Apollo.QueryResult<GetSubCategoryQuery, GetSubCategoryQueryVariables>;