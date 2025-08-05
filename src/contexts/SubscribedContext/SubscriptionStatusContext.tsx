"use client";
import  { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useStatusQuery } from '@/graphql/getSubscribedStatus.generated'; 
// Types if you have them

type SubscriptionStatusContextType = {
  subscribed: boolean | null;
  setSubscribed: (value: boolean) => void;
  loading: boolean;
};

const SubscriptionStatusContext = createContext<SubscriptionStatusContextType | undefined>(undefined);

export const SubscriptionStatusProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading } = useStatusQuery();
  const [subscribed, setSubscribed] = useState<boolean | null>(null);

  useEffect(() => {
    if (data?.getSubscribedStatus?.subscribed !== undefined) {
      setSubscribed(data.getSubscribedStatus.subscribed);
    }
  }, [data]);

  return (
    <SubscriptionStatusContext.Provider value={{ subscribed, setSubscribed, loading }}>
      {children}
    </SubscriptionStatusContext.Provider>
  );
};

export const useSubscriptionStatus = () => {
  const context = useContext(SubscriptionStatusContext);
  if (!context) {
    throw new Error('useSubscriptionStatus must be used within a SubscriptionStatusProvider');
  }
  return context;
};