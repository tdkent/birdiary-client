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
      <div className="fixed left-0 top-[88px] z-50 grid w-full">
        <Alert className="rounded-none border-none bg-purple-100/90 px-2.5 py-1 dark:bg-purple-900/90 sm:px-6 lg:px-8 dark:lg:bg-purple-900/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <AlertCircleIcon
                className="size-5 shrink-0 grow-0 stroke-purple-600 dark:stroke-purple-400 sm:size-6"
                strokeWidth={1.5}
              />
              <AlertTitle className="mb-0 text-[15px] leading-6 text-purple-600 dark:text-purple-400 sm:text-lg">
                You are currently signed out.{" "}
                <Link
                  className="font-semibold text-primary hover:underline"
                  href="/#plans"
                >
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
                strokeWidth={1.5}
                className="size-5 stroke-purple-600 dark:stroke-purple-400 sm:size-6"
              />
            </Button>
          </div>
        </Alert>
      </div>
    </>
  );
}
