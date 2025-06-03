"use server";
import { cookies } from "next/headers";
import { AES } from "crypto-js";
export const handleLogin = async (email: string, password: string) => {
  try {
    // Ensure that the environment variables are defined
    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
    if (!loginUrl) {
      throw new Error("environment variable is not defined");
    }
    const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error("environment variable is not defined");
    }
    // post request to the login URL with encrypted password and email
    const res = await fetch(loginUrl, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: AES.encrypt(password, encryptionKey).toString(),
      }),
    });

    const result = await res.json();
    (await cookies()).set("data", JSON.stringify(result));
    console.log("Login result:", result);

    if (result.error) {
      return { error: result.error };
    }
    return result;
  } catch (error) {
    console.error("Login failed:", error);
  }
};
