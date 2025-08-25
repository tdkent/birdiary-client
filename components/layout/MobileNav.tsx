"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AlignJustify } from "lucide-react";
import { Separator } from "../ui/separator";
import { caveat } from "@/lib/fonts";
import { AuthContext } from "@/context/AuthContext";
import { mobile as mobileNavLinks } from "@/data/nav";
import Logo from "@/components/layout/Logo";

export function MobileNav() {
  const { isSignedIn } = useContext(AuthContext);
  const [navLinks, setNavLinks] = useState<typeof mobileNavLinks>([]);

  useEffect(() => {
    const exclude = isSignedIn ? "auth" : "protected";
    setNavLinks(mobileNavLinks.filter((link) => link.type !== exclude));
  }, [isSignedIn]);

  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify className="size-7" strokeWidth={1.5} />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[90%]">
        <SheetHeader>
          <SheetTitle
            className={`${caveat.className} mt-12 font-normal antialiased`}
          >
            <SheetClose asChild>
              <Logo logoStyles="h-14 w-14" textStyles="text-4xl" />
            </SheetClose>
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden.Root>Navigation links</VisuallyHidden.Root>
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-4 text-xl">
          <ul className="flex flex-col">
            {navLinks.map(({ label, href, icon: Icon }, idx) => {
              return (
                <React.Fragment key={label}>
                  <li>
                    <div className="py-3">
                      <SheetClose asChild>
                        <Link
                          href={`/${href}`}
                          className={`flex w-fit items-center ${href === "newsighting" ? "btn-new gap-1 rounded-md border px-4 py-2" : "gap-4"}`}
                        >
                          {Icon && (
                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                          )}
                          {label}
                        </Link>
                      </SheetClose>
                    </div>
                  </li>
                  {idx !== navLinks.length - 1 && <Separator />}
                </React.Fragment>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
