import * as Types from "../graphql-types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetStatusConnectionQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type GetStatusConnectionQuery = {
	__typename?: "Query";
	getStatusConnection: {
		__typename?: "StatusConnectionResult";
		connected: Types.ConnectedEnum;
		connectedAt: string;
	};
};

export const GetStatusConnectionDocument = gql`
    query getStatusConnection {
  getStatusConnection {
    connected
    connectedAt
  }
}
    `;

/**
 * __useGetStatusConnectionQuery__
 *
 * To run a query within a React component, call `useGetStatusConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatusConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatusConnectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatusConnectionQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetStatusConnectionQuery,
		GetStatusConnectionQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<
		GetStatusConnectionQuery,
		GetStatusConnectionQueryVariables
	>(GetStatusConnectionDocument, options);
}
export function useGetStatusConnectionLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetStatusConnectionQuery,
		GetStatusConnectionQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<
		GetStatusConnectionQuery,
		GetStatusConnectionQueryVariables
	>(GetStatusConnectionDocument, options);
}
export function useGetStatusConnectionSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetStatusConnectionQuery,
				GetStatusConnectionQueryVariables
		  >,
) {
	const options =
		baseOptions === Apollo.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<
		GetStatusConnectionQuery,
		GetStatusConnectionQueryVariables
	>(GetStatusConnectionDocument, options);
}
export type GetStatusConnectionQueryHookResult = ReturnType<
	typeof useGetStatusConnectionQuery
>;
export type GetStatusConnectionLazyQueryHookResult = ReturnType<
	typeof useGetStatusConnectionLazyQuery
>;
export type GetStatusConnectionSuspenseQueryHookResult = ReturnType<
	typeof useGetStatusConnectionSuspenseQuery
>;
export type GetStatusConnectionQueryResult = Apollo.QueryResult<
	GetStatusConnectionQuery,
	GetStatusConnectionQueryVariables
>;
