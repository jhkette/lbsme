import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProviderlessUserAuthGatewayQueryVariables = Types.Exact<{
  web?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type GetProviderlessUserAuthGatewayQuery = { __typename?: 'Query', getProviderlessUserAuthGateway?: { __typename?: 'UserAuthGatewayResult', url: string } | null };

export type GetStatusConnectionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetStatusConnectionQuery = { __typename?: 'Query', getStatusConnection: { __typename?: 'StatusConnectionResult', connected: Types.ConnectedEnum, connectedAt: string } };

export type GetRefreshUserAuthGatewayQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetRefreshUserAuthGatewayQuery = { __typename?: 'Query', getRefreshUserAuthGateway?: { __typename?: 'UserAuthGatewayResult', url: string } | null };


export const GetProviderlessUserAuthGatewayDocument = gql`
    query getProviderlessUserAuthGateway($web: Boolean) {
  getProviderlessUserAuthGateway(web: $web) {
    url
  }
}
    `;

/**
 * __useGetProviderlessUserAuthGatewayQuery__
 *
 * To run a query within a React component, call `useGetProviderlessUserAuthGatewayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProviderlessUserAuthGatewayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProviderlessUserAuthGatewayQuery({
 *   variables: {
 *      web: // value for 'web'
 *   },
 * });
 */
export function useGetProviderlessUserAuthGatewayQuery(baseOptions?: Apollo.QueryHookOptions<GetProviderlessUserAuthGatewayQuery, GetProviderlessUserAuthGatewayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProviderlessUserAuthGatewayQuery, GetProviderlessUserAuthGatewayQueryVariables>(GetProviderlessUserAuthGatewayDocument, options);
      }
export function useGetProviderlessUserAuthGatewayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProviderlessUserAuthGatewayQuery, GetProviderlessUserAuthGatewayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProviderlessUserAuthGatewayQuery, GetProviderlessUserAuthGatewayQueryVariables>(GetProviderlessUserAuthGatewayDocument, options);
        }
// @ts-ignore
export function useGetProviderlessUserAuthGatewaySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProviderlessUserAuthGatewayQuery, GetProviderlessUserAuthGatewayQueryVariables>): Apollo.UseSuspenseQueryResult<GetProviderlessUserAuthGatewayQuery, GetProviderlessUserAuthGatewayQueryVariables>;
export function useGetProviderlessUserAuthGatewaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProviderlessUserAuthGatewayQuery, GetProviderlessUserAuthGatewayQueryVariables>): Apollo.UseSuspenseQueryResult<GetProviderlessUserAuthGatewayQuery | undefined, GetProviderlessUserAuthGatewayQueryVariables>;
export function useGetProviderlessUserAuthGatewaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProviderlessUserAuthGatewayQuery, GetProviderlessUserAuthGatewayQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProviderlessUserAuthGatewayQuery, GetProviderlessUserAuthGatewayQueryVariables>(GetProviderlessUserAuthGatewayDocument, options);
        }
export type GetProviderlessUserAuthGatewayQueryHookResult = ReturnType<typeof useGetProviderlessUserAuthGatewayQuery>;
export type GetProviderlessUserAuthGatewayLazyQueryHookResult = ReturnType<typeof useGetProviderlessUserAuthGatewayLazyQuery>;
export type GetProviderlessUserAuthGatewaySuspenseQueryHookResult = ReturnType<typeof useGetProviderlessUserAuthGatewaySuspenseQuery>;
export type GetProviderlessUserAuthGatewayQueryResult = Apollo.QueryResult<GetProviderlessUserAuthGatewayQuery, GetProviderlessUserAuthGatewayQueryVariables>;
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
export function useGetStatusConnectionQuery(baseOptions?: Apollo.QueryHookOptions<GetStatusConnectionQuery, GetStatusConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatusConnectionQuery, GetStatusConnectionQueryVariables>(GetStatusConnectionDocument, options);
      }
export function useGetStatusConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatusConnectionQuery, GetStatusConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatusConnectionQuery, GetStatusConnectionQueryVariables>(GetStatusConnectionDocument, options);
        }
// @ts-ignore
export function useGetStatusConnectionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetStatusConnectionQuery, GetStatusConnectionQueryVariables>): Apollo.UseSuspenseQueryResult<GetStatusConnectionQuery, GetStatusConnectionQueryVariables>;
export function useGetStatusConnectionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStatusConnectionQuery, GetStatusConnectionQueryVariables>): Apollo.UseSuspenseQueryResult<GetStatusConnectionQuery | undefined, GetStatusConnectionQueryVariables>;
export function useGetStatusConnectionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStatusConnectionQuery, GetStatusConnectionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStatusConnectionQuery, GetStatusConnectionQueryVariables>(GetStatusConnectionDocument, options);
        }
export type GetStatusConnectionQueryHookResult = ReturnType<typeof useGetStatusConnectionQuery>;
export type GetStatusConnectionLazyQueryHookResult = ReturnType<typeof useGetStatusConnectionLazyQuery>;
export type GetStatusConnectionSuspenseQueryHookResult = ReturnType<typeof useGetStatusConnectionSuspenseQuery>;
export type GetStatusConnectionQueryResult = Apollo.QueryResult<GetStatusConnectionQuery, GetStatusConnectionQueryVariables>;
export const GetRefreshUserAuthGatewayDocument = gql`
    query getRefreshUserAuthGateway {
  getRefreshUserAuthGateway {
    url
  }
}
    `;

/**
 * __useGetRefreshUserAuthGatewayQuery__
 *
 * To run a query within a React component, call `useGetRefreshUserAuthGatewayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRefreshUserAuthGatewayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRefreshUserAuthGatewayQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRefreshUserAuthGatewayQuery(baseOptions?: Apollo.QueryHookOptions<GetRefreshUserAuthGatewayQuery, GetRefreshUserAuthGatewayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRefreshUserAuthGatewayQuery, GetRefreshUserAuthGatewayQueryVariables>(GetRefreshUserAuthGatewayDocument, options);
      }
export function useGetRefreshUserAuthGatewayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRefreshUserAuthGatewayQuery, GetRefreshUserAuthGatewayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRefreshUserAuthGatewayQuery, GetRefreshUserAuthGatewayQueryVariables>(GetRefreshUserAuthGatewayDocument, options);
        }
// @ts-ignore
export function useGetRefreshUserAuthGatewaySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRefreshUserAuthGatewayQuery, GetRefreshUserAuthGatewayQueryVariables>): Apollo.UseSuspenseQueryResult<GetRefreshUserAuthGatewayQuery, GetRefreshUserAuthGatewayQueryVariables>;
export function useGetRefreshUserAuthGatewaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRefreshUserAuthGatewayQuery, GetRefreshUserAuthGatewayQueryVariables>): Apollo.UseSuspenseQueryResult<GetRefreshUserAuthGatewayQuery | undefined, GetRefreshUserAuthGatewayQueryVariables>;
export function useGetRefreshUserAuthGatewaySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRefreshUserAuthGatewayQuery, GetRefreshUserAuthGatewayQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRefreshUserAuthGatewayQuery, GetRefreshUserAuthGatewayQueryVariables>(GetRefreshUserAuthGatewayDocument, options);
        }
export type GetRefreshUserAuthGatewayQueryHookResult = ReturnType<typeof useGetRefreshUserAuthGatewayQuery>;
export type GetRefreshUserAuthGatewayLazyQueryHookResult = ReturnType<typeof useGetRefreshUserAuthGatewayLazyQuery>;
export type GetRefreshUserAuthGatewaySuspenseQueryHookResult = ReturnType<typeof useGetRefreshUserAuthGatewaySuspenseQuery>;
export type GetRefreshUserAuthGatewayQueryResult = Apollo.QueryResult<GetRefreshUserAuthGatewayQuery, GetRefreshUserAuthGatewayQueryVariables>;