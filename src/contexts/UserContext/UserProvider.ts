import React from "react";

import { ReactNode } from "react";
// import ChildrenProps from "@interfaces/ChildrenProps";
import _User from "@/interfaces/User";

type ChildrenProps = {
  children: ReactNode;
};

import { AES } from "crypto-js";



interface User extends _User {
  username: string;
}

export interface UserContextValue {
  user?: User | null;
  amplifySignIn: (email: string, password: string) => Promise<string>;
  refreshUser: (user: User) => void;
}

export const UserContext = React.createContext<UserContextValue>({
  user: undefined,
  amplifySignIn: async () => "",
  refreshUser: () => {},
});

const UserProvider = ({ children }: ChildrenProps) => {


  const amplifySignIn = async (_email: string, _password: string) => {
    try {
      const res = await fetch(NEXT_PUBLIC_LOGIN_URL, {
        method: "POST",
        body: JSON.stringify({
          email: _email,
          password: AES.encrypt(_password, NEXT_PUBLIC_ENCRYPTION_KEY).toString(),
        }),
      });

      const result = await res.json();

      if (result.error) {
        throw new Error(result.message);
      }

     

      return result.data.username;
    } catch (error) {
      throw new Error(error as string);
    }
  };

//   const refreshUser = (userInfo: User) => {
//     dispatch({
//       type: actionTypes.LOGIN_USER,
//       payload: userInfo,
//     });
//   };

  return (
    <UserContext.Provider value={{ amplifySignIn, refreshUser }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
