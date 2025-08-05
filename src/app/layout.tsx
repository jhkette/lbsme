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
import {SubscriptionStatusProvider}  from "@/contexts/SubscribedContext/SubscriptionStatusContext";
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
            <SubscriptionStatusProvider>
            <OpenBankingProvider>
              <UserProvider>
                <main>{children}</main>
              </UserProvider>
            </OpenBankingProvider>
            </SubscriptionStatusProvider>
          </UserSignupProvider>
        </ApolloProviderWrapper>
        </AmplifyProvider>

        <Analytics />
      </body>
    </html>
  );
}
