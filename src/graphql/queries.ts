import { gql } from '@apollo/client';

export const GET_SUBSCRIPTIONS = gql`
  query getSubscriptions {
    getSubscriptions(status: ACTIVE) {
      subscriptions {
        merchant {
          icon
          id
          name
        }
        displayName
        cancellationStatus
        monthlyCost
        paymentMethod
        priceChange
        providerName
        subscriptionId
        type
        saveUp
      }
    }
  }
`;