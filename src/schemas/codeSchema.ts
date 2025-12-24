import { z } from "zod";
export const CodeSchema = z.object({
	code: z.string().min(3, "This code is too short"),
});

export type CodeData = z.infer<typeof CodeSchema>;
