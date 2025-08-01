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
 

  // Sort data by monthlyCost descending
  const sortedData = [...simplifiedData].sort(
    (a, b) => b.monthlyCost - a.monthlyCost
  );

  return sortedData.length > 0 ? (
    <div className="chart-wrapper w-full h-full">
      <ResponsiveContainer width="90%" height="80%" className="mt-4">
        <BarChart
          width={400}
          height={200}
          data={sortedData}
          margin={{ top: 3, right: 30, left: 0, bottom: 10 }}
        >
          <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#20b2c3ff" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#baf8ffff" stopOpacity={0.2} />
          </linearGradient>
          <XAxis dataKey="displayName" tick={false} />
          <YAxis tickFormatter={(value) => `£${value}`} />
          <Tooltip
            formatter={(value: number) => [
              `£${value.toFixed(2)}`,
              "Monthly Cost",
            ]}
          />
          <Bar
            dataKey="monthlyCost"
            name="Monthly Subscription cost"
            activeBar={<Rectangle fill="#426da9" stroke="#1a1a1a" />}
          >
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={"url(#colorSpend)"}
                stroke="#1a1a1a"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <LoaderCircle className="size-12 mx-auto mt-30 text-lbgreen animate-spin" />
  );
}
