import React from "react";
import {
  PieChart,
  Pie,
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
import LineChartPayment from "./LineGraph";

export default function ResponsiveGraphContainer({
  barchart,
  simplifiedData,
}: {
  simplifiedData: { displayName: string; monthlyCost: number; fill: string }[];
  barchart: boolean;
}) {
  const barColors = ["#00B1C4", "#426DA9", "#414a4c"];

  // Sort data by monthlyCost descending
  const sortedData = [...simplifiedData].sort(
    (a, b) => b.monthlyCost - a.monthlyCost
  );

  const simplifiedDataPie = sortedData.map((sub, index) => ({
    ...sub,
    value: sub.monthlyCost,
    name: sub.displayName ? sub.displayName : "",
    fill: barColors[index % barColors.length],
  }));

  return barchart ? (
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
    </ResponsiveContainer>
  ) : (
    <LineChartPayment/>
  );
}

