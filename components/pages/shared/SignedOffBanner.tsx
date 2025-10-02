"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AlertCircleIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SignedOffBanner() {
  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(!isSignedIn);

  useEffect(() => {
    const checkSessionStorage = sessionStorage.getItem("showSignedOutBanner");
    if (checkSessionStorage === "false") setOpen(false);
  }, []);

  if (isSignedIn || !open) return null;

  const handleClick = () => {
    setOpen(false);
    sessionStorage.setItem("showSignedOutBanner", "false");
  };

  return (
    <>
      <div className="mb-8 grid w-full max-w-xl">
        <Alert className="border-0 bg-purple-100 px-4 py-1 dark:bg-purple-900">
          <div className="flex items-center justify-between">
            <div className="flex w-4/5 items-center gap-2">
              <AlertCircleIcon
                className="shrink-0 grow-0 stroke-purple-600 dark:stroke-purple-400"
                strokeWidth={2}
                size={20}
              />
              <AlertTitle className="mb-0 font-semibold text-purple-600 dark:text-purple-400">
                You are currently signed out.{" "}
                <Link className="text-primary hover:underline" href="/plans">
                  Learn more
                </Link>
              </AlertTitle>
            </div>
            <Button
              className="w-fit"
              size="icon"
              variant="ghost"
              onClick={handleClick}
            >
              <X
                strokeWidth={2}
                size={20}
                className="stroke-purple-600 dark:stroke-purple-400"
              />
            </Button>
          </div>
        </Alert>
      </div>
    </>
  );
}
