"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
          <SheetTitle
            className={`${caveat.className} mt-12 text-4xl antialiased`}
          >
            <SheetClose asChild>
              <Link href="/">
                <div className="flex items-center justify-center gap-4 md:gap-4">
                  <div className="relative h-12 w-12 rounded-full border-2 border-blue-300 md:h-16 md:w-16">
                    <Image
                      src="/icon/blue-jay-icon.webp"
                      alt="Blue Jay"
                      fill
                      sizes="(max-width: 768px) 48px, 64px"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span
                    className={`${caveat.className} text-4xl antialiased md:text-5xl`}
                  >
                    Birdiary
                  </span>
                </div>
              </Link>
            </SheetClose>
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden.Root>Navigation links</VisuallyHidden.Root>
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-4">
          <ul className="flex flex-col">
            {navLinks.map(({ label, href, icon: Icon }, idx) => {
              return (
                <React.Fragment key={label}>
                  <li>
                    <div className="py-3">
                      <SheetClose asChild>
                        <Link
                          href={`/${href}`}
                          className={`flex w-fit items-center gap-2 ${href === "new" && `new-sighting-btn-colors rounded-md border px-4 py-2`}`}
                        >
                          {Icon && <Icon className="h-3 w-3" />}
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
