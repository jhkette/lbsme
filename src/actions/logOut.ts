"use server";

import { cookies } from "next/headers";
import { useUser } from "@/contexts/UserContext/UserProvider";

export const logOut = async () => {
    
    const cookieStore = await cookies();
    // Clear the user cookie
    cookieStore.delete("user");
    // Clear the token cookie
    cookieStore.delete("token");
 
}