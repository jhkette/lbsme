import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Subscription } from "@/interfaces/Subscription";
import HoverCardComponent from "../lbcoreui/HoverCardComponent";
import { FileSpreadsheet } from "lucide-react";
import { mkConfig, generateCsv, download } from "export-to-csv";

interface DashboardSubsProps {
  subs: Subscription[];
}
export default function DashboardGraph(props: DashboardSubsProps) {
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  const barColors = [
    "#00B1C4", 
    "#426DA9",
    "#c4f9ff", 
  ];

  const simplifiedData = props.subs.map((sub) => ({
    displayName: sub.displayName,
    monthlyCost: sub.monthlyCost.toFixed(2),
    fill: barColors[Math.floor(Math.random() * barColors.length)],
  }));

  const exportDataToCSV = () => {
    const plainSubs = props.subs.map((sub) => ({
      displayName: sub.displayName,
      monthlyCost: sub.monthlyCost,
      renewalDate: sub.dates.renewalDate,
      lastPayment: sub.dates.lastPaymentDate,
      paymentMethod: sub.paymentMethod,
      merchantName: sub.merchant?.name,
    }));
    const csv = generateCsv(csvConfig)(plainSubs);
    download(csvConfig)(csv);
  };

  return (
    <div className="w-1/2 p-4 rounded-lg shadow-lg bg-white h-110">
      <div className="flex flex-row items-center justify-between mx-8 pb-1 border-b-1 border-lbtextgrey">
        <h2 className="text-lg font-semibold">Upcoming Transactions</h2>{" "}
        <HoverCardComponent>
          <div className="flex justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                A visualisation of your monthly spending
              </p>
            </div>
          </div>
        </HoverCardComponent>
      </div>
      <div
        className="flex flex-row justify-end items-bottom my-2 mx-8 block w-fit border-b border-transparent hover:border-lbgreen cursor-pointer ease-in-out"
        onClick={exportDataToCSV}
      >
        <FileSpreadsheet color="#00B1C4" />
        <p className="text-sm font-light text-lbgreen mt-1">
          Export subscription data to CSV{" "}
        </p>
      </div>

      <ResponsiveContainer width="90%" height="80%" className="mt-4">
        <BarChart
          width={400}
          height={200}
          data={simplifiedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="displayName" tick={false} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="monthlyCost"
            fill="#00B1C4"
            name="Monthly Subscription cost"
            activeBar={<Rectangle fill="#00B1C4" stroke="#1a1a1a" />}
          >
            {simplifiedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
