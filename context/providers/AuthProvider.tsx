"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import { AuthContextType } from "@/models/context";
import { checkSession } from "@/helpers/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  function signIn() {
    setIsSignedIn(true);
  }

  function signOut() {
    setIsSignedIn(false);
  }

  const auth: AuthContextType = {
    isSignedIn,
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
