import React from "react";
import {
 
  BarChart,
  Bar,
  Cell,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
 
  ResponsiveContainer,
} from "recharts";
import { LoaderCircle } from "lucide-react";

export default function BarchartGraph({
 
  simplifiedData,
}: {
  simplifiedData: { displayName: string; monthlyCost: number; fill: string }[];
  
}) {
  const barColors = ["#00B1C4", "#426DA9", "#414a4c"];

  // Sort data by monthlyCost descending
  const sortedData = [...simplifiedData].sort(
    (a, b) => b.monthlyCost - a.monthlyCost
  );



  return  (
    sortedData.length > 0 ? ( 
    <ResponsiveContainer width="90%" height="80%" className="mt-4">
      <BarChart
        width={400}
        height={200}
        data={sortedData}
        margin={{ top: 3, right: 30, left: 20, bottom: 10 }}
      >
        <XAxis dataKey="displayName" tick={false} />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [
            `£${value.toFixed(2)}`,
            "Monthly Cost",
          ]}
        />
        <Bar
          dataKey="monthlyCost"
          name="Monthly Subscription cost"
          activeBar={<Rectangle fill="#00B1C4" stroke="#1a1a1a" />}
        >
          {sortedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>) :(
        <LoaderCircle className="size-12 mx-auto mt-30 text-lbgreen animate-spin" />
    )
)
}