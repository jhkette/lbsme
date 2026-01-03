import * as Types from "../graphql-types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetAllDealsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAllDealsQuery = {
	__typename?: "Query";
	getAllDeals: Array<{
		__typename?: "DealCategory";
		category: string;
		deals: Array<{
			__typename?: "GetAllDealsResult";
			currency: string;
			description: string;
			logo: string;
			name: string;
			price: number;
			url: string;
			summary: string;
		}>;
	}>;
};

export const GetAllDealsDocument = gql`
    query getAllDeals {
  getAllDeals {
    deals {
      currency
      description
      logo
      name
      price
      url
      summary
    }
    category
  }
}
    `;

/**
 * __useGetAllDealsQuery__
 *
 * To run a query within a React component, call `useGetAllDealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDealsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDealsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetAllDealsQuery,
		GetAllDealsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetAllDealsQuery, GetAllDealsQueryVariables>(
		GetAllDealsDocument,
		options,
	);
}
export function useGetAllDealsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetAllDealsQuery,
		GetAllDealsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<GetAllDealsQuery, GetAllDealsQueryVariables>(
		GetAllDealsDocument,
		options,
	);
}
// @ts-ignore
export function useGetAllDealsSuspenseQuery(
	baseOptions?: Apollo.SuspenseQueryHookOptions<
		GetAllDealsQuery,
		GetAllDealsQueryVariables
	>,
): Apollo.UseSuspenseQueryResult<GetAllDealsQuery, GetAllDealsQueryVariables>;
export function useGetAllDealsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetAllDealsQuery,
				GetAllDealsQueryVariables
		  >,
): Apollo.UseSuspenseQueryResult<
	GetAllDealsQuery | undefined,
	GetAllDealsQueryVariables
>;
export function useGetAllDealsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetAllDealsQuery,
				GetAllDealsQueryVariables
		  >,
) {
	const options =
		baseOptions === Apollo.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<GetAllDealsQuery, GetAllDealsQueryVariables>(
		GetAllDealsDocument,
		options,
	);
}
export type GetAllDealsQueryHookResult = ReturnType<typeof useGetAllDealsQuery>;
export type GetAllDealsLazyQueryHookResult = ReturnType<
	typeof useGetAllDealsLazyQuery
>;
export type GetAllDealsSuspenseQueryHookResult = ReturnType<
	typeof useGetAllDealsSuspenseQuery
>;
export type GetAllDealsQueryResult = Apollo.QueryResult<
	GetAllDealsQuery,
	GetAllDealsQueryVariables
>;
