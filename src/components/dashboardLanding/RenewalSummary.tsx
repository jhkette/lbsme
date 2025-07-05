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

  return (
    <div className="scrollbar-hide scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-lbgreen scrollbar-track-lbgreen w-1/2  py-4 rounded-lg shadow-2xl bg-white max-h-110 overflow-y-auto">
      <div className="flex flex-row items-center justify-between px-8">
        <h2 className="text-lg font-semibold ">Upcoming Transactions</h2>{" "}
        <HoverCardComponent>
          <div className="flex justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                This details upcoming renewal dates and payments
              </p>
            </div>
          </div>
        </HoverCardComponent>
      </div>

      <div className="flex flex-row items-center gap-4 pb-2 pt-3 bg-bggrey w-full px-6">
        <p
          className={clsx(
            "py-1 px-2 w-fit cursor-pointer block",
            renewal && "font-bold border-b-2 border-lbtextgrey"
          )}
          onClick={() => setRenewal(true)}
        >
          Next Renewal
        </p>
        <p
          className={clsx(
            "py-1 px-2 w-fit cursor-pointer block",
            !renewal && "font-bold border-b-2 border-lbtextgrey"
          )}
          onClick={() => setRenewal(false)}
        >
          Last Payments
        </p>
      </div>
      <div className="px-8">
        {subs.subs.map((sub) => {
          return (
            <TransactionDetail
              sub={sub}
              renewal={renewal}
              key={sub.subscriptionId}
            />
          );
        })}
      </div>
    </div>
  );
}
