"use client"
import HeaderDashboard from "@/components/lbcoreui/HeaderDashboard";
import Sidebar from "@/components/lbcoreui/Sidebar";
import { useState,useEffect } from "react";
import { fetchTopDeals } from "@/actions/deals";
import { Toaster } from 'react-hot-toast';
import { ApolloProvider, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getApolloClient } from "@/apollo/createClient";

export default function Layout({ children }: { children: React.ReactNode }) {

  


  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    // Initialize Apollo Client only on client side
    const apolloClient = getApolloClient();
    setClient(apolloClient);
  }, []);

  // Show loading or return null while client is initializing
  if (!client) {
    return <div>Loading...</div>; // Or return null for no flash
  }

//   // console.log("Apollo Client initialized:", apolloClient);
//    const loadDeals = async () => {
//   try {
//     const deals = await fetchTopDeals('Dec 17 2024 ','June 17 2025');
//     console.log('Top deals:', deals);
//     for(let deal of deals.getSubscriptions.subscriptions){
//       console.log(deal)
//     }
//     // deals will be properly typed as Deal[]
//   } catch (error) {
//     // Handle errors
//     console.log(error)
//   }
// };
// // console.log(loadDeals)
// loadDeals()

  return (
   <ApolloProvider client={client}>
    <div className="flex flex-col items-start  min-h-screen bg-gray-100">
      
        <HeaderDashboard />
        
        <div className="flex flex-row w-full">
          <Sidebar />
          {children}
        </div>
       <Toaster/>
      
  
    </div>
     </ApolloProvider>
   
  );
}
