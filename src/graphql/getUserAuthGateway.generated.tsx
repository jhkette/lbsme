import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserAuthGatewayQueryVariables = Types.Exact<{
  provider: Types.Scalars['String']['input'];
}>;


export type GetUserAuthGatewayQuery = { __typename?: 'Query', getUserAuthGateway: { __typename?: 'UserAuthGatewayResult', url: string } };


export const GetUserAuthGatewayDocument = gql`
    query getUserAuthGateway($provider: String!) {
  getUserAuthGateway(provider: $provider) {
    url
  }
}
    `;

/**
 * __useGetUserAuthGatewayQuery__
 *
 * To run a query within a React component, call `useGetUserAuthGatewayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAuthGatewayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAuthGatewayQuery({
 *   variables: {
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useGetUserAuthGatewayQuery(baseOptions: Apollo.QueryHookOptions<GetUserAuthGatewayQuery, GetUserAuthGatewayQueryVariables> & ({ variables: GetUserAuthGatewayQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAuthGatewayQuery, GetUserAuthGatewayQueryVariables>(GetUserAuthGatewayDocument, options);
      }
export function useGetUserAuthGatewayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAuthGatewayQuery, GetUserAuthGatewayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAuthGatewayQuery, GetUserAuthGatewayQueryVariables>(GetUserAuthGatewayDocument, options);
        }
// @ts-ignore
export function useGetUserAuthGatewaySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserAuthGatewayQuery, GetUserAuthGatewayQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserAuthGatewayQuery, GetUserAuthGatewayQueryVariables>;
export function useGetUserAuthGatewaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserAuthGatewayQuery, GetUserAuthGatewayQueryVariables>): Apollo.UseSuspenseQueryResult<GetUserAuthGatewayQuery | undefined, GetUserAuthGatewayQueryVariables>;
export function useGetUserAuthGatewaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserAuthGatewayQuery, GetUserAuthGatewayQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserAuthGatewayQuery, GetUserAuthGatewayQueryVariables>(GetUserAuthGatewayDocument, options);
        }
export type GetUserAuthGatewayQueryHookResult = ReturnType<typeof useGetUserAuthGatewayQuery>;
export type GetUserAuthGatewayLazyQueryHookResult = ReturnType<typeof useGetUserAuthGatewayLazyQuery>;
export type GetUserAuthGatewaySuspenseQueryHookResult = ReturnType<typeof useGetUserAuthGatewaySuspenseQuery>;
export type GetUserAuthGatewayQueryResult = Apollo.QueryResult<GetUserAuthGatewayQuery, GetUserAuthGatewayQueryVariables>;