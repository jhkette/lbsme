"use client";
import HeaderDashboard from "@/components/lbcoreui/HeaderDashboard";
import Sidebar from "@/components/lbcoreui/Sidebar";
import { useUser } from "@/contexts/UserContext/UserProvider";

import { useRouter } from 'next/navigation';
export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
   const router = useRouter();
  // useEffect(() => {
  //   // Check if user is logged in, if not redirect to login page
  //   if (!user?.email) {
  //   router.push("/");
  //   }
  // },[user]
  
  // )
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
