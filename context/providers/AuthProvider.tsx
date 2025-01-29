"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import { AuthContextType } from "@/models/context";
import { checkSession, getCookie } from "@/helpers/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  async function signIn() {
    setIsSignedIn(true);

    // fetch cookie
    const cookie = (await getCookie()) as string;
    setToken(cookie);
  }

  function signOut() {
    setIsSignedIn(false);
    setToken("");
  }

  const auth: AuthContextType = {
    isSignedIn,
    token,
    signIn,
    signOut,
  };

  useEffect(() => {
    const checkAuth = async () => {
      setIsSignedIn(await checkSession());
    };
    checkAuth();
  }, [isSignedIn]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
