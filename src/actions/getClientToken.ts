// This function is used on the client side to get the token from cookies
export function getClientToken(): string | null {
	if (typeof window === "undefined") {
		// Server side — do nothing here directly
		throw new Error(
			"getToken() should not be called on server directly. Use getToken()",
		);
	} else {
		// Client side
		const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
		try {
			return match ? JSON.parse(decodeURIComponent(match[2])) : null;
		} catch {
			return null;
		}
	}
}
