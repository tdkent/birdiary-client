"use client";

import { useContext, useEffect, useState, createContext } from "react";
import { usePathname } from "next/navigation";
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

  const path = usePathname();

  const checkAuth = async () => {
    const hasSession = await checkSession();
    setIsSignedIn(hasSession);
    if (hasSession) {
      const cookie = (await getCookie()) as string;
      setToken(cookie);
    } else {
      setToken("");
    }
  };

  // Check auth on navigation and refresh
  useEffect(() => {
    checkAuth();
  }, [path, isSignedIn]);

  async function signIn() {
    setIsSignedIn(true);
    setToken((await getCookie()) as string);
  }

  function signOut() {
    setIsSignedIn(false);
    setToken("");
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
