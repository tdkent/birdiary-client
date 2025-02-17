"use client";

import { useContext } from "react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { signOut as signOutAction } from "@/actions/auth";

export default function SignInOutButton() {
  const { isSignedIn, signOut } = useContext(AuthContext);

  async function handleClick() {
    signOut();
    await signOutAction();
  }

  if (isSignedIn) {
    return (
      <Button variant="outline" className="rounded-xl" onClick={handleClick}>
        <LockKeyhole />
        Sign Out
      </Button>
    );
  }
  return (
    <Link href="/signin">
      <Button variant="outline" className="rounded-xl">
        <LockKeyhole />
        Sign In
      </Button>
    </Link>
  );
}
