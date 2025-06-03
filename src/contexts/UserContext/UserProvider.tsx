"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface User {
  username?: string;
  email: string;
  emailVerified?: boolean;
  familyName: string;
  givenName: string;
  phoneNumber: string;
  postcode?: string;
  termsAndConditions?: boolean;
  accessToken?: string;
  refreshToken?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (userData: User) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (userData: User) => {
    setUserState(userData);
  };

  const clearUser = () => {
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
