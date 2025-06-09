import * as Types from '../graphql-types/generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSubscriptionsQueryVariables = Types.Exact<{
  status: Types.SubscriptionStatusEnum;
  category?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortKey?: Types.InputMaybe<Types.SubscriptionsSortKeyEnum>;
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  nextToken?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetSubscriptionsQuery = { __typename?: 'Query', getSubscriptions?: { __typename?: 'GetSubscriptionsResult', nextToken?: number | null, subscriptions?: Array<{ __typename?: 'Subscription', freeTrial: boolean, cancellationStatus?: Types.CancellationStatusEnum | null, displayName?: string | null, monthlyCost: number, paymentMethod?: string | null, priceChange: number, providerName: string, subscriptionId: string, type: Types.SubscriptionPriceTypeEnum, saveUp: number, category?: { __typename?: 'AssignedCategory', PK: string, SK: string, category: string, searchCategory: string, searchSubCategory: string, subCategory: string } | null, dates: { __typename?: 'SubscriptionDates', endsInDays: number, endsInPercent?: number | null, lastPaymentDate: string, renewalDate: string }, merchant: { __typename?: 'Merchant', icon?: string | null, id: string, name: string } }> | null } | null };

export type GetBankAccountDaysLeftQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBankAccountDaysLeftQuery = { __typename?: 'Query', getBankAccount: Array<{ __typename?: 'BankAccountResultType', status: Types.BankAccountStatusEnum, linkDetails: { __typename?: 'BankAccountLinkDetails', daysLeft: number } }> };


export const GetSubscriptionsDocument = gql`
    query getSubscriptions($status: SubscriptionStatusEnum!, $category: String, $sortKey: SubscriptionsSortKeyEnum, $limit: Int, $nextToken: Int) {
  getSubscriptions(
    status: $status
    category: $category
    sortKey: $sortKey
    limit: $limit
    nextToken: $nextToken
  ) {
    subscriptions {
      category {
        PK
        SK
        category
        searchCategory
        searchSubCategory
        subCategory
      }
      dates {
        endsInDays
        endsInPercent
        lastPaymentDate
        renewalDate
      }
      freeTrial
      merchant {
        icon
        id
        name
      }
      cancellationStatus
      displayName
      monthlyCost
      paymentMethod
      priceChange
      providerName
      subscriptionId
      type
      saveUp
    }
    nextToken
  }
}
    `;

/**
 * __useGetSubscriptionsQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionsQuery({
 *   variables: {
 *      status: // value for 'status'
 *      category: // value for 'category'
 *      sortKey: // value for 'sortKey'
 *      limit: // value for 'limit'
 *      nextToken: // value for 'nextToken'
 *   },
 * });
 */
export function useGetSubscriptionsQuery(baseOptions: Apollo.QueryHookOptions<GetSubscriptionsQuery, GetSubscriptionsQueryVariables> & ({ variables: GetSubscriptionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>(GetSubscriptionsDocument, options);
      }
export function useGetSubscriptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>(GetSubscriptionsDocument, options);
        }
export function useGetSubscriptionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>(GetSubscriptionsDocument, options);
        }
export type GetSubscriptionsQueryHookResult = ReturnType<typeof useGetSubscriptionsQuery>;
export type GetSubscriptionsLazyQueryHookResult = ReturnType<typeof useGetSubscriptionsLazyQuery>;
export type GetSubscriptionsSuspenseQueryHookResult = ReturnType<typeof useGetSubscriptionsSuspenseQuery>;
export type GetSubscriptionsQueryResult = Apollo.QueryResult<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>;
export const GetBankAccountDaysLeftDocument = gql`
    query getBankAccountDaysLeft {
  getBankAccount {
    linkDetails {
      daysLeft
    }
    status
  }
}
    `;

/**
 * __useGetBankAccountDaysLeftQuery__
 *
 * To run a query within a React component, call `useGetBankAccountDaysLeftQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBankAccountDaysLeftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBankAccountDaysLeftQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBankAccountDaysLeftQuery(baseOptions?: Apollo.QueryHookOptions<GetBankAccountDaysLeftQuery, GetBankAccountDaysLeftQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBankAccountDaysLeftQuery, GetBankAccountDaysLeftQueryVariables>(GetBankAccountDaysLeftDocument, options);
      }
export function useGetBankAccountDaysLeftLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBankAccountDaysLeftQuery, GetBankAccountDaysLeftQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBankAccountDaysLeftQuery, GetBankAccountDaysLeftQueryVariables>(GetBankAccountDaysLeftDocument, options);
        }
export function useGetBankAccountDaysLeftSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBankAccountDaysLeftQuery, GetBankAccountDaysLeftQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBankAccountDaysLeftQuery, GetBankAccountDaysLeftQueryVariables>(GetBankAccountDaysLeftDocument, options);
        }
export type GetBankAccountDaysLeftQueryHookResult = ReturnType<typeof useGetBankAccountDaysLeftQuery>;
export type GetBankAccountDaysLeftLazyQueryHookResult = ReturnType<typeof useGetBankAccountDaysLeftLazyQuery>;
export type GetBankAccountDaysLeftSuspenseQueryHookResult = ReturnType<typeof useGetBankAccountDaysLeftSuspenseQuery>;
export type GetBankAccountDaysLeftQueryResult = Apollo.QueryResult<GetBankAccountDaysLeftQuery, GetBankAccountDaysLeftQueryVariables>;