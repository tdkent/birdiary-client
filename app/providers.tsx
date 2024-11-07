"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import { checkSession } from "@/helpers/auth";

export default function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsSignedIn(await checkSession());
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={isSignedIn}>{children}</AuthContext.Provider>
  );
}
