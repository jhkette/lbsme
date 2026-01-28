import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SaveSubscriptionMutationVariables = Types.Exact<{
  subscription: Types.SaveSubscriptionInput;
}>;


export type SaveSubscriptionMutation = { __typename?: 'Mutation', saveSubscription: { __typename?: 'SaveSubscriptionResult', id: string, success: boolean, error?: string | null } };

export type DeleteManualSubscriptionsMutationVariables = Types.Exact<{
  subscriptionId: Types.Scalars['String']['input'];
  status: Types.SubscriptionStatusEnum;
}>;


export type DeleteManualSubscriptionsMutation = { __typename?: 'Mutation', deleteManualSubscriptions?: { __typename?: 'DeleteManualSubscriptionResult', success: boolean } | null };


export const SaveSubscriptionDocument = gql`
    mutation saveSubscription($subscription: SaveSubscriptionInput!) {
  saveSubscription(subscription: $subscription) {
    id
    success
    error
  }
}
    `;
export type SaveSubscriptionMutationFn = Apollo.MutationFunction<SaveSubscriptionMutation, SaveSubscriptionMutationVariables>;

/**
 * __useSaveSubscriptionMutation__
 *
 * To run a mutation, you first call `useSaveSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveSubscriptionMutation, { data, loading, error }] = useSaveSubscriptionMutation({
 *   variables: {
 *      subscription: // value for 'subscription'
 *   },
 * });
 */
export function useSaveSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<SaveSubscriptionMutation, SaveSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveSubscriptionMutation, SaveSubscriptionMutationVariables>(SaveSubscriptionDocument, options);
      }
export type SaveSubscriptionMutationHookResult = ReturnType<typeof useSaveSubscriptionMutation>;
export type SaveSubscriptionMutationResult = Apollo.MutationResult<SaveSubscriptionMutation>;
export type SaveSubscriptionMutationOptions = Apollo.BaseMutationOptions<SaveSubscriptionMutation, SaveSubscriptionMutationVariables>;
export const DeleteManualSubscriptionsDocument = gql`
    mutation deleteManualSubscriptions($subscriptionId: String!, $status: SubscriptionStatusEnum!) {
  deleteManualSubscriptions(subscriptionId: $subscriptionId, status: $status) {
    success
  }
}
    `;
export type DeleteManualSubscriptionsMutationFn = Apollo.MutationFunction<DeleteManualSubscriptionsMutation, DeleteManualSubscriptionsMutationVariables>;

/**
 * __useDeleteManualSubscriptionsMutation__
 *
 * To run a mutation, you first call `useDeleteManualSubscriptionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteManualSubscriptionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteManualSubscriptionsMutation, { data, loading, error }] = useDeleteManualSubscriptionsMutation({
 *   variables: {
 *      subscriptionId: // value for 'subscriptionId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useDeleteManualSubscriptionsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteManualSubscriptionsMutation, DeleteManualSubscriptionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteManualSubscriptionsMutation, DeleteManualSubscriptionsMutationVariables>(DeleteManualSubscriptionsDocument, options);
      }
export type DeleteManualSubscriptionsMutationHookResult = ReturnType<typeof useDeleteManualSubscriptionsMutation>;
export type DeleteManualSubscriptionsMutationResult = Apollo.MutationResult<DeleteManualSubscriptionsMutation>;
export type DeleteManualSubscriptionsMutationOptions = Apollo.BaseMutationOptions<DeleteManualSubscriptionsMutation, DeleteManualSubscriptionsMutationVariables>;