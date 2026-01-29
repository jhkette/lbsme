import { SubscriptionPriceTypeEnum } from "@/interfaces/PriceTypeEnum";
import { costRegex } from "@/lib/consts";
import { z } from "zod";

export const costSchema = z.object({
	cost: z
		.string()
		.min(1, "Cost is required")
		.regex(costRegex, "Invalid cost format"),
	frequency: z.nativeEnum(SubscriptionPriceTypeEnum, {
		errorMap: () => ({ message: "Frequency is required" }),
	}),
	provider: z.string().optional(),
	category: z.string().optional(),
});

export type CostSchema = z.infer<typeof costSchema>;
