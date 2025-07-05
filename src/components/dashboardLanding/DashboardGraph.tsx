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
import { Download } from "lucide-react";
import { mkConfig, generateCsv, download } from "export-to-csv";

interface DashboardSubsProps {
  subs: Subscription[];
}
export default function DashboardGraph(props: DashboardSubsProps) {
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  const barColors = ["#00B1C4", "#426DA9", "#c4f9ff"];

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
    <div className="w-1/2 p-4 rounded-lg shadow-2xl bg-white h-110">
      <div className="flex flex-row items-center justify-between mx-8 pb-1 border-b-1 border-lbtextgrey">
        <h2 className="text-lg font-semibold">Monthly Spend Visualised</h2>{" "}
      </div>
      <div className="flex flex-row w-[90%] items-center justify-end my-2 mx-8 block">
        <div
          className="block w-fit justify-start bg-lbgray rounded-lg p-2 mr-2 hover:bg-lbgreen cursor-pointer ease-in-out"
          onClick={exportDataToCSV}
        >
          <Download color="#787787" size={24} className="" />
        </div>
      </div>
     {/* Start of barchart */}
      <ResponsiveContainer width="90%" height="80%" className="mt-4">
        <BarChart
          width={400}
          height={200}
          data={simplifiedData}
          margin={{
            top: 3,
            right: 30,
            left: 20,
            bottom: 10,
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
