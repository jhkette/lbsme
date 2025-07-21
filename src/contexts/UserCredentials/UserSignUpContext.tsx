'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserCredentials = {
  given_name: string;
  family_name: string;
  email: string;
  terms_and_conditions: string;
  phoneNumber: string;
};

type SignupContextType = {
  userCredentials: UserCredentials | null;
  setUserCredentials: (data: UserCredentials) => void;
  clearUserCredentials: () => void;
};

const UserSignupContext = createContext<SignupContextType | undefined>(undefined);

export const UserSignupProvider = ({ children }: { children: ReactNode }) => {
  const [userCredentials, setUserCredentialsState] = useState<UserCredentials | null>(null);

  const setUserCredentials = (data: UserCredentials) => setUserCredentialsState(data);
  const clearUserCredentials = () => setUserCredentialsState(null);

  return (
    <UserSignupContext.Provider value={{ userCredentials, setUserCredentials, clearUserCredentials }}>
      {children}
    </UserSignupContext.Provider>
  );
};

export const useUserSignup = () => {
  const context = useContext(UserSignupContext);
  if (!context) {
    throw new Error('useUserSignup must be used within a UserSignupProvider');
  }
  return context;
};
