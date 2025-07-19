"use client"; // if using in a Next.js app directory

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { NetworkStatus } from "@apollo/client";
import {
  useGetProviderlessUserAuthGatewayQuery,
  useGetRefreshUserAuthGatewayQuery,
} from "@/graphql/getOpenBanking.generated";

interface OpenBankingProps {
  openOBPage: () => void;
  openReconnectPage: () => void;
  refreshOBLink: () => void;
  OBLoading: boolean;
}

interface OpenBankingComponent {
  children: ReactNode;
}

const OBContext = createContext<OpenBankingProps>({
  openOBPage: () => {},
  openReconnectPage: () => {},
  refreshOBLink: () => {},
  OBLoading: false,
});

export const useOBContext = () => useContext(OBContext);

const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

const OpenBankingProvider: FC<OpenBankingComponent> = ({ children }) => {
  const isMount = useIsMount();
  const [OBLoading, setOBLoading] = useState(false);

  // Replace this with actual user/subscription context if needed
  const subscribed = true;

  const {
    data,
    refetch,
    networkStatus,
  } = useGetProviderlessUserAuthGatewayQuery({
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    pollInterval: 359000,
    skip: !subscribed,
  });

  const {
    data: reconsentData,
    refetch: refetchReconsent,
    networkStatus: reconsentNetworkStatus,
  } = useGetRefreshUserAuthGatewayQuery({
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    pollInterval: 359000,
    skip: !subscribed,
  });

  useEffect(() => {
    if (data?.getProviderlessUserAuthGateway?.url && OBLoading) {
      window.location.href = data.getProviderlessUserAuthGateway.url;
     
    }
  }, [data, OBLoading]);

  const openOBPage = useCallback(async () => {
    console.log("ran", data, data?.getProviderlessUserAuthGateway?.url)
    if (networkStatus === NetworkStatus.error) return;

    if (data?.getProviderlessUserAuthGateway?.url) {
      window.location.href = data.getProviderlessUserAuthGateway.url;
    } else {
      setOBLoading(true);
      await refetch();
    }
  }, [data?.getProviderlessUserAuthGateway?.url, networkStatus, refetch]);

  const openReconnectPage = useCallback(async () => {
    if (reconsentNetworkStatus === NetworkStatus.error) return;

    if (reconsentData?.getRefreshUserAuthGateway?.url) {
      window.location.href = reconsentData.getRefreshUserAuthGateway.url;
    } else {
      await refetchReconsent();
    }
  }, [reconsentData?.getRefreshUserAuthGateway?.url, reconsentNetworkStatus, refetchReconsent]);

  const refreshOBLink = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <OBContext.Provider
      value={{
        openOBPage,
        openReconnectPage,
        refreshOBLink,
        OBLoading,
      }}
    >
      {children}
    </OBContext.Provider>
  );
};

export default OpenBankingProvider;