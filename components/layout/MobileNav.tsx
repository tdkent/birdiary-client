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
        <AlignJustify />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[90%]">
        <SheetHeader>
          <SheetTitle className={`${caveat.className} antialiased text-4xl`}>
            Birdiary
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden.Root>Navigation links</VisuallyHidden.Root>
          </SheetDescription>
        </SheetHeader>
        <nav>
          <ul className="flex flex-col">
            {navLinks.map(({ label, href, icon: Icon }, idx) => {
              return (
                <React.Fragment key={label}>
                  <li>
                    <div className="py-3">
                      <SheetClose asChild>
                        <Link href={`/${href}`}>
                          <span className="flex items-center gap-2.5">
                            {Icon && <Icon className="w-3 h-3" />}
                            {label}
                          </span>
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
