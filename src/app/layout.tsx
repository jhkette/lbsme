import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext/UserProvider";
import {useGetSubscriptionsSummaryQuery} from "@/graphql/getSubscriptionSummary.generated"

const mulishSans = Mulish({
  variable: "--font-mulish-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Little Birdie",
  description: "The UK's top subscription & bill management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className={`${mulishSans.variable} antialiased`}>
      <Head>
        {/* temp hide from search engines */}
        <meta name="robots" content="noindex,nofollow" />
      </Head>
        
      <UserProvider>
       
        <body className="antialiased">
         
          <main>{children}</main>
            
        </body>
       
      
      </UserProvider>
      
     
    </html>
  );
}
