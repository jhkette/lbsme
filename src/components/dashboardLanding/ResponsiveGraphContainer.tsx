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

export default function ResponsiveGraphContainer({
  barchart,
  simplifiedData,
}: {
  simplifiedData: { displayName: string; monthlyCost: number; fill: string }[];
  barchart: boolean;
}) {
  const barColors = ["#00B1C4", "#426DA9", "#414a4c"];
  const simplifiedDataPie = simplifiedData.map((sub, index) => ({
    ...sub,
    value: sub.monthlyCost,
    name: sub.displayName ? sub.displayName : "" ,
    fill: barColors[index % barColors.length],
  }));
  return barchart ? (
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
        <Tooltip
          formatter={(value: number) => [
            `£${value.toFixed(2)}`,
            "Monthly Cost",
          ]}
        />

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
  ) : (
    <ResponsiveContainer width="100%" height={305} className="mt-8">
      <PieChart margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
        <Pie
          data={simplifiedDataPie}
          dataKey="value"
          nameKey="name"
          cx="40%"
          cy="40%"
          outerRadius={90}
        />
        <Tooltip
          formatter={(value: number) => [
            `£${value.toFixed(2)}`,
            "Monthly Cost",
          ]}
        />
        <Legend
          align="left"
          verticalAlign="bottom"
          wrapperStyle={{
            paddingLeft: 20,
            marginTop: -10,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
