"use client";
import  { createContext, useContext, useState, ReactNode } from 'react';

type BlurContextType = {
  isBlurred: boolean;
  setIsBlurred: (value: boolean) => void;
};

const BlurContext = createContext<BlurContextType | undefined>(undefined);

export const BlurProvider = ({ children }: { children: ReactNode }) => {
  const [isBlurred, setIsBlurred] = useState<boolean>(false);



  return (
    <BlurContext.Provider value={{ isBlurred, setIsBlurred }}>
      {children}
    </BlurContext.Provider>
  );
}

export const useBlur = () => {
  const context = useContext(BlurContext);
  if (!context) {
    throw new Error('useBlur must be used within a BlurProvider');
  }
  return context;
}