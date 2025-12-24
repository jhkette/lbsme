import * as Types from "../graphql-types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
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
