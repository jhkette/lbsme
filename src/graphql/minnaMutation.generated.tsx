import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchMinnaWebUiMutationVariables = Types.Exact<{
  subscriptionId: Types.Scalars['String']['input'];
}>;


export type FetchMinnaWebUiMutation = { __typename?: 'Mutation', fetchMinnaWebUI?: { __typename?: 'fetchMinnaWebUIResult', url?: string | null, authToken?: string | null, validTo?: string | null } | null };


export const FetchMinnaWebUiDocument = gql`
    mutation fetchMinnaWebUI($subscriptionId: String!) {
  fetchMinnaWebUI(subscriptionId: $subscriptionId) {
    url
    authToken
    validTo
  }
}
    `;
export type FetchMinnaWebUiMutationFn = Apollo.MutationFunction<FetchMinnaWebUiMutation, FetchMinnaWebUiMutationVariables>;

/**
 * __useFetchMinnaWebUiMutation__
 *
 * To run a mutation, you first call `useFetchMinnaWebUiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFetchMinnaWebUiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fetchMinnaWebUiMutation, { data, loading, error }] = useFetchMinnaWebUiMutation({
 *   variables: {
 *      subscriptionId: // value for 'subscriptionId'
 *   },
 * });
 */
export function useFetchMinnaWebUiMutation(baseOptions?: Apollo.MutationHookOptions<FetchMinnaWebUiMutation, FetchMinnaWebUiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FetchMinnaWebUiMutation, FetchMinnaWebUiMutationVariables>(FetchMinnaWebUiDocument, options);
      }
export type FetchMinnaWebUiMutationHookResult = ReturnType<typeof useFetchMinnaWebUiMutation>;
export type FetchMinnaWebUiMutationResult = Apollo.MutationResult<FetchMinnaWebUiMutation>;
export type FetchMinnaWebUiMutationOptions = Apollo.BaseMutationOptions<FetchMinnaWebUiMutation, FetchMinnaWebUiMutationVariables>;