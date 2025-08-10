

import LineChartPayment from "@/components/dashboardLanding/graphs/LineGraph";
import BarchartGraph from "@/components/dashboardLanding/graphs/BarchartGraph";
export default function ResponsiveGraphContainer({
  barchart,
  simplifiedData,
}: {
  simplifiedData: { displayName: string; monthlyCost: number; fill: string }[];
  barchart: boolean;
}) {






  return barchart ? (
    <BarchartGraph simplifiedData={simplifiedData}/>
  ) : (
    <LineChartPayment/>
  );
}

