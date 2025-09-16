"use client";

import { useContext, useEffect, useState, createContext } from "react";
import { checkSession, getCookie } from "@/helpers/auth";
import type { AuthState } from "@/models/auth";
import { Messages } from "@/models/api";

export const AuthContext = createContext<AuthState>({
  isSignedIn: false,
  token: "",
  signIn: () => {},
  signOut: () => {},
});

/** Essential app-level authentication state values */
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const refreshTokenInState = async () => {
      if (await checkSession()) {
        setTokenInState();
      }
    };
    refreshTokenInState();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      setIsSignedIn(await checkSession());
    };
    checkAuth();
  }, [isSignedIn]);

  async function signIn() {
    setIsSignedIn(true);
    setTokenInState();
  }

  function signOut() {
    setIsSignedIn(false);
    setToken("");
  }

  async function setTokenInState() {
    const cookie = (await getCookie()) as string;
    setToken(cookie);
  }

  const auth: AuthState = {
    isSignedIn,
    token,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error(Messages.ContextError);
  return context;
}
