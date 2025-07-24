'use client';

import { Amplify } from 'aws-amplify';
import { useEffect } from 'react';

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID as string,
          userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID as string,
          identityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID as string,
         
          loginWith: {
            email: true,
          },
          signUpVerificationMethod: "code",
          userAttributes: {
            email: {
              required: true,
            },
          },
          allowGuestAccess: true,
          passwordFormat: {
            minLength: 8,
            requireLowercase: true,
            requireUppercase: true,
            requireNumbers: true,
            requireSpecialCharacters: true,
          },
        },
      },
    });
  }, []);

  return <>{children}</>;
}