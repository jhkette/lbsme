"use client";
import HeaderDashboard from "@/components/lbcoreui/HeaderDashboard";
import Sidebar from "@/components/lbcoreui/Sidebar";
import useApolloClient from "@/apollo/useApolloClient";
export default function Layout({ children }: { children: React.ReactNode }) {
  const apolloClient = useApolloClient();
  console.log("Apollo Client initialized:", apolloClient);
 
  
  return (
    <div className="flex flex-col items-start  min-h-screen bg-gray-100">
      <HeaderDashboard />
      <div className="flex flex-row w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
