"use client";
import HeaderDashboard from "@/components/lbcoreui/HeaderDashboard";
import Sidebar from "@/components/lbcoreui/Sidebar";

import { Toaster } from "react-hot-toast";
import { motion} from 'framer-motion'
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
 const pathname = usePathname();
  return (
    // <ApolloProvider client={client}>
      <div className="flex flex-col items-start  min-h-screen bg-gray-100">
        <HeaderDashboard />
      
        <div className="flex flex-row w-full">
          <Sidebar />
          {/* <AnimatePresence mode="wait"> */}
             <motion.div
           key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="w-full"
          >
          {children}</motion.div>
          {/* </AnimatePresence> */}
        </div>
        <Toaster />
      </div>
    // </ApolloProvider>
  );
}
