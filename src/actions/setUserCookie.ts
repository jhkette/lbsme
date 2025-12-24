// actions/setUser.ts
"use server";
import { UserInterface } from "@/interfaces/User";
import { cookies } from "next/headers";
export const setUserCookie = async (user: UserInterface) => {
	(await cookies()).set("user", JSON.stringify(user));
};
