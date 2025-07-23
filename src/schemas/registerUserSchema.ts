import { z } from "zod";

export const userInfoSchema = z.object({
  given_name: z.string().min(2, "First name is required"),
  family_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  terms_and_conditions: z.preprocess(
    (val) => (val === "true" ? "true" : undefined),
    z.literal("true", {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    })
  ),
 phoneNumber: z.preprocess(
  (val) => {
    if (typeof val === "string") {
      return val.replace(/\s+/g, ""); // removes all whitespace
    }
    return val;
  },
  z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{1,14}$/, "Phone number must be in valid E.164 format")
),
});

// If using with React Hook Form:
export type UserInfoSchema = z.infer<typeof userInfoSchema>;
