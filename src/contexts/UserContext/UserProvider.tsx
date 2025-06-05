"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { getUser } from "@/actions/getUser";
import { setUserCookie } from "@/actions/setUserCookie";
import { UserInterface } from "@/interfaces/User";

interface UserContextType {
  user: UserInterface | null;
  setUser: (userData: UserInterface) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserInterface | null>(null);

 useEffect(() => {
  const fetchUser = async () => {
    const currentUser = await getUser();
    console.log("Fetched user:", currentUser);
    if (currentUser) {
      setUserState(currentUser);
    }
  };
  fetchUser();
}, []);

  useEffect(() => {
    if (user) {
      setUserCookie(user);
    }
  }, [user]);

  const setUser = (userData: UserInterface) => {
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
