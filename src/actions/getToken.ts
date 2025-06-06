// actions/getUser.ts
"use server";

import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get("token");

  if (!userToken) return null;

  try {
    return JSON.parse(userToken.value);
  } catch {
    return null;
  }
}
