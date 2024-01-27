"use client";
import React, { useState } from "react";

import { useStorageState } from "../hooks/useStorageState";
import { AuthCheckService } from "@/services";
import { IAuthUser } from "@/interfaces";

export const USER_SESSION_KEY = "user-session";

interface IAuthContext {
  user: IAuthUser | null;
  updateUser: (user: IAuthUser) => void;
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isSessionLoading: boolean;
}

const AuthContext = React.createContext<{
  user: IAuthUser | null;
  updateUser: (user: IAuthUser) => void;
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isSessionLoading: boolean;
} | null>(null);

// This hook can be used to access the user info.
const useSession = () => {
  const value = React.useContext(AuthContext);
  // check this IF statement.
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
};

const SessionProvider = (props: React.PropsWithChildren) => {
  // here we set the token
  const [[isSessionLoading, session], setSession] =
    useStorageState(USER_SESSION_KEY);
  const [user, setUser] = useState<IAuthUser | null>(null);

  React.useEffect(() => {
    if (!isSessionLoading) {
      AuthCheckService({
        success(res: any) {
          setUser(res?.user);
        },
        error() {
          console.log("clear session");
          setSession(null);
          setUser(null);
        },
      });
    }
  }, [session, isSessionLoading, setSession]);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        updateUser: (user: IAuthUser) => {
          setUser(user);
        },
        signIn: (token: string) => {
          setSession(token);
        },
        signOut: () => {
          setUser(null);
          setSession(null);
        },
        session,
        isSessionLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { useSession, SessionProvider };
