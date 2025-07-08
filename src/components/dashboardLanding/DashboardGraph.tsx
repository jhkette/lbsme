"use client";
import {useState} from "react";
import { clsx} from "clsx"
import { Subscription } from "@/interfaces/Subscription";
import { Download, BarChart as BarchartIcon, PieChart } from "lucide-react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import ResponsiveGraphContainer from "./ResponsiveGraphContainer";

interface DashboardSubsProps {
  subs: Subscription[];
}
export default function DashboardGraph(props: DashboardSubsProps) {

  const [showBarChart, setShowBarChart] = useState(true);
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  const barColors = ["#00B1C4", "#426DA9", "#c4f9ff"];

  const simplifiedData = props.subs.map((sub) => ({
    displayName: sub.displayName,
    monthlyCost: parseFloat(sub.monthlyCost.toFixed(2)),
    fill: "#426da9"
  }));

  const exportDataToCSV = () => {
    const plainSubs = props.subs.map((sub) => ({
      displayName: sub.displayName,
      monthlyCost: sub.monthlyCost.toFixed(2),
      renewalDate: sub.dates.renewalDate,
      lastPayment: sub.dates.lastPaymentDate,
      paymentMethod: sub.paymentMethod,
      merchantName: sub.merchant?.name,
    }));
    const csv = generateCsv(csvConfig)(plainSubs);
    download(csvConfig)(csv);
  };

  return (
    <div className="w-1/2 p-4 rounded-2xl shadow-2xl bg-white h-120">
      <div className="flex flex-row items-center justify-between mx-8 pb-1 my-2">
        <h2 className="text-2xl font-semibold">Monthly Spend Visualised</h2>{" "}
      </div>
      <div className="flex flex-row w-[90%] items-center justify-between my-2 mx-8 block">
        <div className="flex flex-row items-center">
            <div
          className={clsx('block w-fit rounded-lg p-2 mr-2 hover:bg-lbgray cursor-pointer ease-in-out', !showBarChart && 'bg-lbgray hover:bg-lbgreen', showBarChart&& 'bg-lbgreen hover:bg-lbgrey')}
        onClick={() => setShowBarChart(true)}
        >
          <BarchartIcon color={showBarChart?   "#fff": "#787787" } size={24} />
          </div>
          <div  className={clsx('block w-fit rounded-lg p-2 mr-2 hover:bg-lbgray cursor-pointer ease-in-out', showBarChart && 'bg-lbgray hover:bg-lbgreen', !showBarChart&& 'bg-lbgreen hover:bg-lbgrey')}
          onClick={() => setShowBarChart(false)}
        >
          <PieChart color={showBarChart?    "#787787" : "#fff"} size={24} />
          </div>
          </div>
        <div
          className="block w-fit justify-start bg-lbgray rounded-lg p-2 mr-2 hover:bg-lbgreen cursor-pointer ease-in-out"
          onClick={exportDataToCSV}
        >
          <div className="text-lbtextgrey hover:text-white">
      <Download size={24} />
    </div>
        </div>
      </div>
     {/* Start of barchart */}
     <ResponsiveGraphContainer barchart={showBarChart} simplifiedData={simplifiedData} />
    </div>
  );
}
