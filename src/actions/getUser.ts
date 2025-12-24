// actions/getUser.ts
"use server";

import { cookies } from "next/headers";

export async function getUser() {
	const cookieStore = await cookies();
	const userCookie = cookieStore.get("user");

	if (!userCookie) return null;

	try {
		return JSON.parse(userCookie.value);
	} catch {
		return null;
	}
}
