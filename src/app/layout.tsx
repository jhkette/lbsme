import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext/UserProvider";
import OpenBankingProvider from "@/contexts/OpenBanking/OpenBankingProvider";
import ApolloProviderWrapper from "@/components/apollo/ApolloWrapper";
import { getToken } from "@/actions/getToken";
import { Analytics } from "@vercel/analytics/next";
import { UserSignupProvider } from "@/contexts/UserCredentials/UserSignUpContext";
import AmplifyProvider from "@/components/amplify/AmplifyConnect";

const mulishSans = Mulish({
  variable: "--font-mulish-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Little Birdie",
  description: "The UK's top subscription & bill management app",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();

  console.log('Environment check:', {
  userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
  identityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
  nodeEnv: process.env.NODE_ENV
});

  return (
    <html lang="en" className={`${mulishSans.variable} antialiased`}>
      <Head>
        {/*  hide from search engines as it is a demo REMOVE if you want the site to be visible
        to search engines.  */}
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <body className="antialiased">
        <AmplifyProvider>
        <ApolloProviderWrapper>
          <UserSignupProvider>
            <OpenBankingProvider>
              <UserProvider>
                <main>{children}</main>
              </UserProvider>
            </OpenBankingProvider>
          </UserSignupProvider>
        </ApolloProviderWrapper>
        </AmplifyProvider>

        <Analytics />
      </body>
    </html>
  );
}
