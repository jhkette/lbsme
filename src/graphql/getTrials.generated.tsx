import * as Types from "../graphql-types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetTrialsQueryVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
	nextToken?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type GetTrialsQuery = {
	__typename?: "Query";
	getTrials: {
		__typename?: "FreeTrialsResult";
		nextToken?: string | null;
		items: Array<{
			__typename?: "GetFreeTrialsResult";
			logo: string;
			name: string;
			url: string;
			description: string;
		}>;
	};
};

export const GetTrialsDocument = gql`
    query getTrials($limit: Int, $nextToken: String) {
  getTrials(limit: $limit, nextToken: $nextToken) {
    items {
      logo
      name
      url
      description
    }
    nextToken
  }
}
    `;

/**
 * __useGetTrialsQuery__
 *
 * To run a query within a React component, call `useGetTrialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrialsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      nextToken: // value for 'nextToken'
 *   },
 * });
 */
export function useGetTrialsQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetTrialsQuery,
		GetTrialsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetTrialsQuery, GetTrialsQueryVariables>(
		GetTrialsDocument,
		options,
	);
}
export function useGetTrialsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetTrialsQuery,
		GetTrialsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<GetTrialsQuery, GetTrialsQueryVariables>(
		GetTrialsDocument,
		options,
	);
}
export function useGetTrialsSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<GetTrialsQuery, GetTrialsQueryVariables>,
) {
	const options =
		baseOptions === Apollo.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<GetTrialsQuery, GetTrialsQueryVariables>(
		GetTrialsDocument,
		options,
	);
}
export type GetTrialsQueryHookResult = ReturnType<typeof useGetTrialsQuery>;
export type GetTrialsLazyQueryHookResult = ReturnType<
	typeof useGetTrialsLazyQuery
>;
export type GetTrialsSuspenseQueryHookResult = ReturnType<
	typeof useGetTrialsSuspenseQuery
>;
export type GetTrialsQueryResult = Apollo.QueryResult<
	GetTrialsQuery,
	GetTrialsQueryVariables
>;
