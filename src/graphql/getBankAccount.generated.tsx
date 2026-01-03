import * as Types from "../graphql-types/generated/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetBankAccountQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type GetBankAccountQuery = {
	__typename?: "Query";
	getBankAccount: Array<{
		__typename?: "BankAccountResultType";
		accountId: string;
		lastSynced: string;
		status: Types.BankAccountStatusEnum;
		provider: {
			__typename?: "ProviderResult";
			displayName: string;
			icon?: string | null;
		};
	}>;
};

export const GetBankAccountDocument = gql`
    query getBankAccount {
  getBankAccount {
    accountId
    lastSynced
    provider {
      displayName
      icon
    }
    status
  }
}
    `;

/**
 * __useGetBankAccountQuery__
 *
 * To run a query within a React component, call `useGetBankAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBankAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBankAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBankAccountQuery(
	baseOptions?: Apollo.QueryHookOptions<
		GetBankAccountQuery,
		GetBankAccountQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetBankAccountQuery, GetBankAccountQueryVariables>(
		GetBankAccountDocument,
		options,
	);
}
export function useGetBankAccountLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetBankAccountQuery,
		GetBankAccountQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<GetBankAccountQuery, GetBankAccountQueryVariables>(
		GetBankAccountDocument,
		options,
	);
}
// @ts-ignore
export function useGetBankAccountSuspenseQuery(
	baseOptions?: Apollo.SuspenseQueryHookOptions<
		GetBankAccountQuery,
		GetBankAccountQueryVariables
	>,
): Apollo.UseSuspenseQueryResult<
	GetBankAccountQuery,
	GetBankAccountQueryVariables
>;
export function useGetBankAccountSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetBankAccountQuery,
				GetBankAccountQueryVariables
		  >,
): Apollo.UseSuspenseQueryResult<
	GetBankAccountQuery | undefined,
	GetBankAccountQueryVariables
>;
export function useGetBankAccountSuspenseQuery(
	baseOptions?:
		| Apollo.SkipToken
		| Apollo.SuspenseQueryHookOptions<
				GetBankAccountQuery,
				GetBankAccountQueryVariables
		  >,
) {
	const options =
		baseOptions === Apollo.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return Apollo.useSuspenseQuery<
		GetBankAccountQuery,
		GetBankAccountQueryVariables
	>(GetBankAccountDocument, options);
}
export type GetBankAccountQueryHookResult = ReturnType<
	typeof useGetBankAccountQuery
>;
export type GetBankAccountLazyQueryHookResult = ReturnType<
	typeof useGetBankAccountLazyQuery
>;
export type GetBankAccountSuspenseQueryHookResult = ReturnType<
	typeof useGetBankAccountSuspenseQuery
>;
export type GetBankAccountQueryResult = Apollo.QueryResult<
	GetBankAccountQuery,
	GetBankAccountQueryVariables
>;
