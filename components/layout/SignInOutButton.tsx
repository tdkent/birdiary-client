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
          open={open}
          setOpen={setOpen}
          triggerText="Sign Out"
          buttonTrigger
          title="Sign Out"
          description="Are you sure you want to sign out?"
        >
          <div>
            <Button
              className="w-full"
              variant="destructive"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <Button variant="link" className="w-fit p-0" asChild>
      <Link href="/signin" className="text-black dark:text-white">
        Sign In
      </Link>
    </Button>
  );
}
