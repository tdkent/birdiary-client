"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { signOut as signOutAction } from "@/actions/auth";
import Modal from "@/components/ui/Modal";

export default function SignInOutButton() {
  const { isSignedIn, signOut } = useContext(AuthContext);
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
          buttonStyles="w-full p-0 hover:bg-transparent"
          buttonVariant="ghost"
          description="Are you sure you want to sign out?"
          open={open}
          setOpen={setOpen}
          title="Sign Out"
          triggerText="Sign Out"
        >
          <div>
            <Button
              className="w-full"
              onClick={handleSignOut}
              variant="destructive"
            >
              Sign Out
            </Button>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <Button size="default" variant="link" className="w-fit p-0" asChild>
      <Link href="/signin" className="text-black dark:text-white">
        Sign In
      </Link>
    </Button>
  );
}
