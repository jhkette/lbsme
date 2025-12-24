import React from "react";

import LineChartPayment from "./graphs/LineGraph";
import BarchartGraph from "./graphs/BarchartGraph";
export default function ResponsiveGraphContainer({
	barchart,
	simplifiedData,
}: {
	simplifiedData: { displayName: string; monthlyCost: number; fill: string }[];
	barchart: boolean;
}) {
	// Sort data by monthlyCost descending
	const sortedData = [...simplifiedData].sort(
		(a, b) => b.monthlyCost - a.monthlyCost,
	);

	return barchart ? (
		<BarchartGraph simplifiedData={simplifiedData} />
	) : (
		<LineChartPayment />
	);
}
