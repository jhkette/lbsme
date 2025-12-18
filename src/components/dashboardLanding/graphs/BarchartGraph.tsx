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
import { cn } from "@/lib/utils";
export default function BarchartGraph({
  simplifiedData,
}: {
  simplifiedData: { displayName: string; monthlyCost: number; fill: string }[];
}) {
 

  // Sort data by monthlyCost descending
  const sortedData = [...simplifiedData].sort(
    (a, b) => b.monthlyCost - a.monthlyCost
  );
  const isSmallDataset = sortedData.length <= 6;
  return sortedData.length > 0 ? (
    <div
  className={cn(
    "chart-wrapper h-full transition-all duration-300",
     isSmallDataset ? "w-[55%]" : "w-full"
  )}
>
      <ResponsiveContainer width="90%" height="80%" className="mt-4">
        <BarChart
          width={400}
          height={200}
          data={sortedData}
          margin={{ top: 3, right: 30, left: 0, bottom: 10 }}
           
        >
          <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#20b6c7ff"  />
            <stop offset="95%" stopColor="#8bc9cfff"  />
          </linearGradient>
          <XAxis dataKey="displayName" tick={false} />
          <YAxis tickFormatter={(value) => `£${value}`} />
          <Tooltip
            formatter={(value: number | undefined) => [
              `£${(value ?? 0).toFixed(2)}`,
              "Monthly Cost",
            ]}
          />
          <Bar
            dataKey="monthlyCost"
            name="Monthly Subscription cost"
            activeBar={<Rectangle fill="#426da9" stroke="#258f9bff" />}
             barSize={isSmallDataset ? 30 : undefined} 
          >
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={"url(#colorSpend)"}
                stroke="#258f9bff"
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
