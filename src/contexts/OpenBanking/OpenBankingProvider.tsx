"use client"; // if using in a Next.js app directory

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { NetworkStatus } from "@apollo/client";
import { useGetProviderlessUserAuthGatewayQuery } from "@/graphql/getOpenBanking.generated";

interface OpenBankingProps {
  openOBPage: () => void;

  OBLoading: boolean;
}

interface OpenBankingComponent {
  children: ReactNode;
}

const OBContext = createContext<OpenBankingProps>({
  openOBPage: () => {},

  OBLoading: false,
});

export const useOBContext = () => useContext(OBContext);

const OpenBankingProvider: FC<OpenBankingComponent> = ({ children }) => {
  const [OBLoading, setOBLoading] = useState(false);

  // Replace this with actual user/subscription context if needed
  const subscribed = true;

  const { data, refetch, networkStatus } =
    useGetProviderlessUserAuthGatewayQuery({
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
      pollInterval: 10000,
      skip: !subscribed,
    });

  useEffect(() => {
    if (data?.getProviderlessUserAuthGateway?.url && OBLoading) {
      const url = data.getProviderlessUserAuthGateway.url;
      window.open(url, "_blank");
    }
  }, [data, OBLoading]);

  const openOBPage = useCallback(async () => {

    if (networkStatus === NetworkStatus.error) return;

    if (data?.getProviderlessUserAuthGateway?.url) {
      const url = data.getProviderlessUserAuthGateway.url;

      window.open(url, "_blank");
    } else {
      setOBLoading(true);
      await refetch();
    }
  }, [data?.getProviderlessUserAuthGateway?.url, networkStatus, refetch]);

  return (
    <OBContext.Provider
      value={{
        openOBPage,

        OBLoading,
      }}
    >
      {children}
    </OBContext.Provider>
  );
};

export default OpenBankingProvider;
