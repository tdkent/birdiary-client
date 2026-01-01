"use client";

import Logo from "@/components/layout/Logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  AlignJustify,
  Bird,
  CircleUserRound,
  House,
  LucideIcon,
  MapPinned,
  Notebook,
  NotebookPen,
  Plus,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

const mobileNavLinks: {
  label: string;
  href: string;
  icon?: LucideIcon;
  type: "public" | "protected";
}[] = [
  {
    label: "Home",
    href: "/",
    icon: House,
    type: "public",
  },
  {
    label: "New Sighting",
    href: "newsighting",
    icon: Plus,
    type: "public",
  },
  {
    label: "Diary",
    href: "diary",
    icon: NotebookPen,
    type: "public",
  },
  {
    label: "Sightings",
    href: "sightings",
    icon: Notebook,
    type: "public",
  },
  {
    label: "Locations",
    href: "locations",
    icon: MapPinned,
    type: "protected",
  },
  {
    label: "Birdpedia",
    href: "birds",
    icon: Bird,
    type: "public",
  },
  {
    label: "Profile",
    href: "profile",
    icon: CircleUserRound,
    type: "protected",
  },
];

/** Shelf with navigation for mobile display. */
export function MobileNav() {
  const { isSignedIn } = useAuth();
  const [navLinks, setNavLinks] = useState<typeof mobileNavLinks>([]);

  useEffect(() => {
    const exclude = isSignedIn ? "auth" : "protected";
    setNavLinks(mobileNavLinks.filter((link) => link.type !== exclude));
  }, [isSignedIn]);

  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify className="size-7 md:size-8" strokeWidth={1.5} />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="mt-12 font-normal antialiased">
            <Logo
              logoStyles="h-14 w-14 md:h-16 md:w-16"
              textStyles="text-4xl md:text-[42px]"
            />
          </SheetTitle>
          <SheetDescription>
            <VisuallyHidden.Root>Navigation links</VisuallyHidden.Root>
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-4 text-xl md:mt-8">
          <ul className="flex flex-col">
            {navLinks.map(({ label, href, icon: Icon }, idx) => {
              return (
                <React.Fragment key={label}>
                  <li>
                    <div className="py-3 md:py-4">
                      <SheetClose asChild>
                        <Link
                          href={`/${href}`}
                          className={`gap-4} flex w-fit items-center gap-4 md:text-2xl`}
                        >
                          {Icon && (
                            <Icon
                              className="h-5 w-5 md:h-6 md:w-6"
                              strokeWidth={1.5}
                            />
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
