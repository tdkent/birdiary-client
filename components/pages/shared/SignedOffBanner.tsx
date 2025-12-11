"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { AlertCircleIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignedOffBanner() {
  const { isSignedIn } = useAuth();
  const path = usePathname();

  const [open, setOpen] = useState(!isSignedIn);

  useEffect(() => {
    const checkSessionStorage = sessionStorage.getItem("showSignedOutBanner");
    if (checkSessionStorage === "false") setOpen(false);
  }, []);

  if (isSignedIn || !open) return null;

  const currPath = path.slice(1).split("/")[0];
  const routes = ["birds", "diary", "newsighting", "sightings"];
  const showBanner = routes.some(
    (route) => currPath && route.startsWith(currPath),
  );

  if (!showBanner) return null;

  const handleClick = () => {
    setOpen(false);
    sessionStorage.setItem("showSignedOutBanner", "false");
  };

  // Use Dialog instead of Popover

  return (
    <>
      <div className="sticky top-0 z-50 grid w-full">
        <Alert className="rounded-none border-none bg-purple-100/90 px-2.5 py-1 dark:bg-purple-900/90 sm:px-6 lg:px-8 dark:lg:bg-purple-900/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <AlertCircleIcon
                className="size-5 shrink-0 grow-0 stroke-purple-600 dark:stroke-purple-400 sm:size-6"
                strokeWidth={1.5}
              />
              <AlertTitle className="mb-0 text-[15px] leading-6 text-purple-600 dark:text-purple-400 sm:text-lg">
                You are currently signed out.{" "}
                <Dialog>
                  <DialogTrigger className="font-semibold text-primary hover:underline">
                    Learn More
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Adding Sightings as a Guest User
                      </DialogTitle>
                    </DialogHeader>
                    <div>
                      <ul className="list-disc">
                        <div className="my-4 flex flex-col gap-2 px-4">
                          <li>
                            Sightings you create without an account are stored
                            in your browser.
                          </li>
                          <li>
                            Create an account to transfer sightings from your
                            browser to our database for permanent storage.
                          </li>
                          <li>
                            Note that data added to a public browser will be
                            viewable by others.
                          </li>
                        </div>
                      </ul>
                      <div className="my-8 flex gap-4">
                        <Button asChild size="lg" variant="secondary">
                          <Link href="/#plans">View Plans</Link>
                        </Button>
                        <Button asChild size="lg" variant="new">
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
