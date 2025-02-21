"use client";

import { useEffect, useState, createContext } from "react";
import { checkSession, getCookie } from "@/helpers/auth";
import { AuthState } from "@/types/auth";

export const AuthContext = createContext<AuthState>({
  isSignedIn: false,
  token: "",
  signIn: () => {},
  signOut: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Essential app-level authentication state values
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  // Check for session and refresh token on page refresh
  useEffect(() => {
    const refreshTokenInState = async () => {
      if (await checkSession()) {
        setTokenInState();
      }
    };
    refreshTokenInState();
  }, []);

  // `isSignedIn` manages auth-based layout
  useEffect(() => {
    const checkAuth = async () => {
      setIsSignedIn(await checkSession());
    };
    checkAuth();
  }, [isSignedIn]);

  //? Note: these functions are hoisted
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
