"use client";
import DashboardSubs from "@/components/subscriptionsLanding/DashboardSubs";
//import { format } from 'date-fns'; // add later
import Image from "next/image";


import IntroHome from "@/components/lbcoreui/IntroHome";
export default function Home() {

  
  return (
    <div className="px-16 w-full mt-12 relative">
      <IntroHome/>
      <Image
        src="/lbgraphic.png"
        height={250}
        width={400}
        alt="graphic"
        className="absolute top-6 z-0 right-40"
      />
      <DashboardSubs />
      
    </div>
  );
}
