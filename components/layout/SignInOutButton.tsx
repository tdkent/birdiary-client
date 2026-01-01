"use client";

import { signOut as signOutAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function SignInOutButton() {
  const { isSignedIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    setOpen(false);
    signOut();
    await signOutAction();
  }

  if (isSignedIn) {
    return (
      <>
        <Modal
          buttonSize="sm"
          buttonVariant="ghost"
          description="Are you sure you want to sign out?"
          open={open}
          setOpen={setOpen}
          title="Sign Out"
          triggerText="Sign Out"
        >
          <Button
            className="mt-4"
            onClick={handleSignOut}
            size="lg"
            variant="destructive"
          >
            Sign Out
          </Button>
        </Modal>
      </>
    );
  }

  return (
    <Button size="sm" variant="ghost" asChild>
      <Link href="/signin">Sign In</Link>
    </Button>
  );
}
