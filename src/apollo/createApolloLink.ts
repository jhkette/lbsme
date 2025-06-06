import { ApolloLink } from "@apollo/client";
import { AUTH_TYPE, createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { UrlInfo } from "aws-appsync-subscription-link/lib/types";
import {getToken} from "@/actions/getToken"


const createApolloLink = (): ApolloLink => {
  const getAuthorization = async (): Promise<string> => {
    const token = await getToken()
    if (!token) {
      throw new Error("No token found");
    }
    return token;
  };

  const config: UrlInfo = {
    url: process.env.REACT_APP_AWS_APPSYNC_URL as string,
    region: process.env.REACT_APP_AWS_PROJECT_REGION as string,
    auth: {
      type: AUTH_TYPE.AWS_LAMBDA,
      token: getAuthorization,
    },
  };

  return ApolloLink.from([createAuthLink(config), createSubscriptionHandshakeLink(config)]);
};

export default createApolloLink;
