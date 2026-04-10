"use server";
import { cookies } from "next/headers";
import { AES } from "crypto-js";

type LoginResponseData = {
	access_token?: string;
	username?: string;
	email?: string;
	emailVerified?: boolean;
	familyName?: string;
	givenName?: string;
	phoneNumber?: string;
	postcode?: string;
};

type LoginResponse = {
	error?: string;
	message?: string;
	data?: LoginResponseData;
};

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
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: AES.encrypt(password, encryptionKey).toString(),
			}),
		});

		const result = (await res
			.json()
			.catch(() => ({ error: "Could not parse response" }))) as LoginResponse;
        /* Handle various error cases and return appropriate error messages */
		if (result.error) {
			return { error: result.error };
		}

		if (!res.ok) {
			return {
				error: result.message || "Login request failed",
			};
		}

		if (!result.data) {
			return {
				error: result.message || "Login response did not include user data",
			};
		}

		if (!result.data.access_token) {
			return {
				error: result.message || "Login response did not include an access token",
			};
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
		return { error: "Unexpected login error" };
	}
};
