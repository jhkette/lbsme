import React from "react";
import { Subscription } from "@/interfaces/Subscription";
import Image from "next/image";
import HoverCardComponent from "@/components/lbcoreui/HoverCardComponent"
import { format, parseISO } from 'date-fns';
import TransactionDetail from "./TransactionDetail"
interface DashboardSubsProps {
  subs: Subscription[];
}

export default function TransactionsLanding(subs: DashboardSubsProps) {
  console.log(subs,)
  return (
    <div className="w-1/2 px-6 py-4 rounded-lg shadow-lg bg-white min-h-80">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold ">Upcoming</h2>{" "}
        <HoverCardComponent>
            <div className="flex justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div className="text-muted-foreground text-xs">
                  Joined December 2021
                </div>
              </div>
            </div>
         </HoverCardComponent>
      </div>
      {subs.subs.map((sub) => {
        
   

        return (
         <TransactionDetail sub={sub}/>
       
        )})}
        
   </div>
  )
}
