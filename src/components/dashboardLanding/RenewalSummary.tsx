import { useState } from "react";
import { Subscription } from "@/interfaces/Subscription";
import HoverCardComponent from "@/components/lbcoreui/HoverCardComponent";
import TransactionDetail from "./RenewalDetail";
import { clsx } from "clsx";
interface DashboardSubsProps {
  subs: Subscription[];
}

export default function TransactionsLanding(subs: DashboardSubsProps) {
  const [renewal, setRenewal] = useState(true);
  
  function sortByRenewalDate(subscriptions: Subscription[]): Subscription[] {
  return subscriptions.sort((a: Subscription, b: Subscription) => {
    const dateA = new Date(a.dates.renewalDate);
    const dateB = new Date(b.dates.renewalDate);
    return dateA.getTime() - dateB.getTime(); // earlier date comes first
  });
}


  function sortByPaymentDate(subscriptions: Subscription[]): Subscription[] {
  return subscriptions.sort((a: Subscription, b: Subscription) => {
    const dateA = new Date(a.dates.lastPaymentDate);
    const dateB = new Date(b.dates.lastPaymentDate);
    return dateB.getTime() - dateA.getTime() ; // earlier date comes first
  });


}

  const lastPaymentSorted = sortByPaymentDate([...subs.subs]);
  const lastRenewalSorted = sortByRenewalDate([...subs.subs]);

  return (
    <div className="w-1/2  py-4 rounded-2xl shadow-2xl bg-white max-h-120 border-1 border-gray-300">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between mx-8 pb-1 my-2">
        <h2 className="text-2xl font-semibold">Upcoming Transactions</h2>{" "}
      </div>
        <HoverCardComponent>
          <div className="flex justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                Upcoming renewal dates and payments
              </p>
            </div>
          </div>
        </HoverCardComponent>
      </div>

      <div className="flex flex-row items-end gap-4 pb-1 pt-3 bg-bggrey w-full px-6">
        <p
          className={clsx(
            "mt-1 py-1 px-2 w-fit cursor-pointer block",
            renewal && "font-bold border-b-2 border-lbtextgrey"
          )}
          onClick={() => setRenewal(true)}
        >
          Next Renewal
        </p>
        <p
          className={clsx(
            "mt-1 py-1 px-2 w-fit cursor-pointer block",
            !renewal && "font-bold border-b-2 border-lbtextgrey"
          )}
          onClick={() => setRenewal(false)}
        >
          Last Payments
        </p>
      </div>
      <div className="px-8 py-2 max-h-85 overflow-y-auto scrollbar-nice">
         {renewal ? 
          lastRenewalSorted.map((sub) => {
            return (
              <TransactionDetail
                sub={sub}
                renewal={renewal}
                key={sub.subscriptionId}
              />
            );
          }) : 
          lastPaymentSorted.map((sub) => {
            return (
              <TransactionDetail
                sub={sub}
                renewal={renewal}
                key={sub.subscriptionId}
              />
            );
          })
        } 
       


      </div>
    </div>
  );
}
