import { z } from 'zod';
export const userInfoSchema = z.object({
  given_name: z.string().min(1, 'First name is required'),
  family_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  terms_and_conditions: z.literal('true').refine(
    (val) => val === 'true',
    {
      message: 'You must accept the terms and conditions',
    }
  ),
  phoneNumber: z
    .string()
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .regex(/^[\d+\-\s()]+$/, 'Invalid phone number format'),
});

// If using with React Hook Form:
export type UserInfoSchema = z.infer<typeof userInfoSchema>;