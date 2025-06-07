"use client";
import HeaderDashboard from "@/components/lbcoreui/HeaderDashboard";
import Sidebar from "@/components/lbcoreui/Sidebar";
import useApolloClient from "@/apollo/useApolloClient";
import { ApolloProvider } from "@apollo/client";
export default function Layout({ children }: { children: React.ReactNode }) {
  const apolloClient = useApolloClient();

  console.log("Apollo Client initialized:", apolloClient);

  return (
    <div className="flex flex-col items-start  min-h-screen bg-gray-100">
      <ApolloProvider client={apolloClient}>
        <HeaderDashboard />
        <div className="flex flex-row w-full">
          <Sidebar />
          {children}
        </div>
      </ApolloProvider>
    </div>
  );
}
