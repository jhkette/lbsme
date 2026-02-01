import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMerchantQueryVariables = Types.Exact<{
  category?: Types.InputMaybe<Types.Scalars['String']['input']>;
  subCategory?: Types.InputMaybe<Types.Scalars['String']['input']>;
  filter?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetMerchantQuery = { __typename?: 'Query', getMerchant?: Array<{ __typename?: 'MerchantResultV2', SK: string, subCategory: string, name: string, id: string, category?: { __typename?: 'CategoryResult', searchName: string, name: string, PK: string, SK: string } | null }> | null };

export type GetSubCategoryQueryVariables = Types.Exact<{
  SK: Types.Scalars['ID']['input'];
}>;


export type GetSubCategoryQuery = { __typename?: 'Query', getSubCategory: Array<{ __typename?: 'SubCategoryResult', searchName: string, name: string, PK: string, SK: string }> };


export const GetMerchantDocument = gql`
    query getMerchant($category: String, $subCategory: String, $filter: String) {
  getMerchant(category: $category, subCategory: $subCategory, filter: $filter) {
    category {
      searchName
      name
      PK
      SK
    }
    SK
    subCategory
    name
    id
  }
}
    `;

/**
 * __useGetMerchantQuery__
 *
 * To run a query within a React component, call `useGetMerchantQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMerchantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMerchantQuery({
 *   variables: {
 *      category: // value for 'category'
 *      subCategory: // value for 'subCategory'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetMerchantQuery(baseOptions?: Apollo.QueryHookOptions<GetMerchantQuery, GetMerchantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMerchantQuery, GetMerchantQueryVariables>(GetMerchantDocument, options);
      }
export function useGetMerchantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMerchantQuery, GetMerchantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMerchantQuery, GetMerchantQueryVariables>(GetMerchantDocument, options);
        }
// @ts-ignore
export function useGetMerchantSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMerchantQuery, GetMerchantQueryVariables>): Apollo.UseSuspenseQueryResult<GetMerchantQuery, GetMerchantQueryVariables>;
export function useGetMerchantSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMerchantQuery, GetMerchantQueryVariables>): Apollo.UseSuspenseQueryResult<GetMerchantQuery | undefined, GetMerchantQueryVariables>;
export function useGetMerchantSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMerchantQuery, GetMerchantQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMerchantQuery, GetMerchantQueryVariables>(GetMerchantDocument, options);
        }
export type GetMerchantQueryHookResult = ReturnType<typeof useGetMerchantQuery>;
export type GetMerchantLazyQueryHookResult = ReturnType<typeof useGetMerchantLazyQuery>;
export type GetMerchantSuspenseQueryHookResult = ReturnType<typeof useGetMerchantSuspenseQuery>;
export type GetMerchantQueryResult = Apollo.QueryResult<GetMerchantQuery, GetMerchantQueryVariables>;
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