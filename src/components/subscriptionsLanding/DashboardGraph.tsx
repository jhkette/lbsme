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
interface DashboardSubsProps {
  subs: Subscription[];
}
export default function DashboardGraph(props: DashboardSubsProps) {
  console.log(props.subs, "GRAPH");

  const barColors = [
    "#00B1C4", // --color-lbgreen
 
    // "#DFE9F2", // --color-lbblue
     "#426DA9",
    "#c4f9ff", // --color-lblgreen
  ];

  const simplifiedData = props.subs.map((sub) => ({
    displayName: sub.displayName,
    monthlyCost: sub.monthlyCost.toFixed(2),
     fill: barColors[Math.floor(Math.random() * barColors.length)]
  }));

  return (
    <div className="w-1/2 p-4 rounded-lg shadow-lg bg-white h-100">
      <div className="flex flex-row items-center justify-between mx-8 pb-1 border-b-1 border-lbtextgrey">
        <h2 className="text-lg font-semibold">Upcoming Transactions</h2>{" "}
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
