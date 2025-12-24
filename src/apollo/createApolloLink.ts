import { ApolloLink } from "@apollo/client";
import { AUTH_TYPE, createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { UrlInfo } from "aws-appsync-subscription-link/lib/types";
import { getToken } from "@/actions/getToken";
import { getClientToken } from "@/actions/getClientToken";

const createApolloLink = (): ApolloLink => {
	const getAuthorization = async (): Promise<string> => {
		// if else blocks to get the cookie server side
		// or client side if called from client.
		try {
			if (typeof window === "undefined") {
				return (await getToken()) || "";
			} else {
				return getClientToken() || "";
			}
		} catch {
			return "";
		}
	};

	const config: UrlInfo = {
		url: process.env.NEXT_PUBLIC_APPSYNC_URL!,
		region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION!,
		auth: {
			type: AUTH_TYPE.AWS_LAMBDA,
			token: getAuthorization,
		},
	};

	return ApolloLink.from([
		createAuthLink(config),
		createSubscriptionHandshakeLink(config),
	]);
};

export default createApolloLink;
