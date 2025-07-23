"use server";
import { cookies } from "next/headers";
import { AES } from "crypto-js";
import { signIn } from 'aws-amplify/auth'

/**
 * Handles user login by sending a POST request to the login URL with encrypted credentials.
 * It sets a cookie with the access token if the login is successful.
 * it then returns the result of the login attempt.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<{ error?: string } | any>} - Returns an object with an error message or the result of the login.
 */
export const handleLogin = async (email: string, password: string) => {
  try {
    // Ensure that the environment variables are defined
    const loginUrl = process.env.LOGIN_URL;
    if (!loginUrl) {
      throw new Error("environment variable is not defined");
    }
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error("environment variable is not defined");
    }
    (await cookies()).delete("token"); // Clear any existing token cookie

    
    // post request to the login URL with encrypted password and email
    const res = await fetch(loginUrl, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: AES.encrypt(password, encryptionKey).toString(),
      }),
    });

    const result = await res
      .json()
      .catch(() => ({ error: "Could not parse response" }));

    if (result.error) {
      return { error: result.error };
    }
    const twoHours = 2 * 60 * 60 * 1000;
    (await cookies()).set("user", JSON.stringify(result.data), {
      expires: Date.now() + twoHours,
      secure: true,
      sameSite: true,
    });
    (await cookies()).set("token", JSON.stringify(result.data.access_token), {
      expires: Date.now() + twoHours,
      secure: true,
      sameSite: true,
    });

    return result;
  } catch (error) {
    console.error("Login failed:", error);
  }
};
