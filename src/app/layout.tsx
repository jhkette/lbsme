import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext/UserProvider";


import ApolloProviderWrapper from "@/components/apollo/ApolloWrapper";

import { Analytics } from "@vercel/analytics/next";
import { UserSignupProvider } from "@/contexts/UserCredentials/UserSignUpContext";
import { SubscriptionStatusProvider } from "@/contexts/SubscribedContext/SubscriptionStatusContext";
import MobileCheck from "@/components/mobileCheck/MobileCheck";
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
        <MobileCheck>
          <AmplifyProvider>
            <ApolloProviderWrapper>
              <UserSignupProvider>
                <SubscriptionStatusProvider>
                  <UserProvider>
                    <main>{children}</main>
                  </UserProvider>
                </SubscriptionStatusProvider>
              </UserSignupProvider>
            </ApolloProviderWrapper>
          </AmplifyProvider>
        </MobileCheck>

        <Analytics />
      </body>
    </html>
  );
}
