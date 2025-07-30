import React, { useState } from "react";
import HoverCardComponent from "@/components/lbcoreui/HoverCardComponent";
import { Subscription } from "@/interfaces/Subscription";
import SpendingDetail from "./TransactionDetail";
import { clsx, type ClassValue } from "clsx";
interface DashboardSubsProps {
  subs: Subscription[];
}
function SpendingSummary(subs: DashboardSubsProps) {
  const [yearly, setYearly] = useState(true);

  console.log(subs.subs, "subs in spending summary");

  return (
    <div className=" w-1/2  py-4 rounded-2xl shadow-2xl bg-white max-h-120 border-1 border-gray-300 overflow-y-auto scrollbar-nice">
      <div className=" flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between mx-8 pb-1 my-2">
        <h2 className="text-2xl font-semibold">Transaction Totals</h2>{" "}
      </div>
        <HoverCardComponent>
          <div className="flex justify-between gap-4">
            <div className="space-y-1">
            
              <p className="text-sm font-semibold">
                This details yearly and monthly total spends for each
                subscription.
              </p>
             
            </div>
          </div>
        </HoverCardComponent>
      </div>
      <div className="flex flex-row items-center gap-4 pb-2 pt-3 bg-bggrey w-full px-6">
        <p
          className={clsx(
            "py-1 px-2 w-fit cursor-pointer block",
            yearly && "font-bold border-b-2 border-lbtextgrey"
          )}
          onClick={() => setYearly(true)}
        >
          This Year
        </p>
        <p
          className={clsx(
            "py-1 px-2 w-fit cursor-pointer block",
            !yearly && "font-bold border-b-2 border-lbtextgrey"
          )}
          onClick={() => setYearly(false)}
        >
          Monthly
        </p>
      </div>
      <div className="px-6">
        {subs.subs.map((sub) => {
          return (
            <SpendingDetail
              sub={sub}
              key={sub.subscriptionId}
              yearly={yearly}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SpendingSummary;
