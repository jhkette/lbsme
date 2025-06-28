import React from "react";
import { GetSubscriptionsQueryResult } from "@/graphql/getMainSubData.generated";
import { Subscription } from "@/interfaces/Subscription";
interface DashboardSubsProps {
  subs: Subscription[];
}

export default function DashboardSubs(subs: DashboardSubsProps) {
  const monthlySpending = Math.round(
    subs.subs.reduce((acc, sub) => acc + sub.monthlyCost, 0)
  );
  const yearlSpending: number = monthlySpending * 12; 
  const expectedMonthlySavings = Math.round(
    subs.subs.reduce((acc, sub) => acc + sub.saveUp, 0)
  ); 
  const expectedYearlySavings: number = expectedMonthlySavings * 12; 
  return (
    <div className="flex flex-row text-lbtext justify-center shadow-lg bg-white rounded-lg p-4 w-full h-36 z-1">
      <div className="flex flex-col justify-center items-center w-1/5">
        <p className="text-4xl font-semibold py-2">{subs.subs.length}</p>
        <p className="text-lg font-base">Subscriptions</p>
      </div>
      <div className="flex flex-col justify-center items-center w-1/5">
        <p className="text-4xl font-semibold py-2">{monthlySpending}</p>
        <p className="text-lg font-base">Monthly Spend</p>
      </div>
      <div className="flex flex-col justify-center items-center w-1/5">
        <p className="text-4xl font-semibold py-2">{yearlSpending}</p>
        <p className="text-lg font-base">Yearly subacriptions</p>
      </div>
      <div className="flex flex-col justify-center items-center w-1/5">
        <p className="text-4xl font-semibold text-lbgreen py-2">
          {expectedMonthlySavings}
        </p>
        <p className="text-lg font-base">Expected Monthly Saving</p>
      </div>
      <div className="flex flex-col justify-center items-center w-1/5">
        <p className="text-4xl font-semibold text-lbgreen py-2">
          {expectedYearlySavings}
        </p>
        <p className="text-lg font-base">Yearly Savings</p>
      </div>
    </div>
  );
}
