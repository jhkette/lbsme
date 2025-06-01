import { z, ZodType } from "zod";


export type SignInData = {
  email: string;
  password: string;
  };
 
export const UserSchema:  ZodType<SignInData> = z.object({ 
  email: z.string().min(3, "Username must be at least 3 characters long"),
  
  password: z.string().min(3, "password must be at least 3 characters long"),
});