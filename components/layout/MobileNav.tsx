"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Binoculars,
  Bird,
  CircleUserRound,
  House,
  LucideIcon,
  MapPinned,
  NotebookPen,
  Scroll,
  UserPen,
} from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AlignJustify } from "lucide-react";
import { Separator } from "../ui/separator";
import MobileNavLink from "./MobileNavLink";

const navLinks: {
  label: string;
  href: string;
  icon?: LucideIcon;
}[] = [
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "Diary",
    href: "/diary",
    icon: NotebookPen,
  },
  {
    label: "My Birds",
    href: "/sightings",
    icon: Binoculars,
  },
  {
    label: "Life List",
    href: "/lifelist",
    icon: Scroll,
  },
  {
    label: "Locations",
    href: "/locations",
    icon: MapPinned,
  },
  {
    label: "Birdpedia",
    href: "/birds",
    icon: Bird,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: CircleUserRound,
  },
  {
    label: "Account",
    href: "/account",
    icon: UserPen,
  },
];

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[90%]">
        <SheetHeader>
          <SheetTitle>birDiary</SheetTitle>
          <SheetDescription>
            <VisuallyHidden.Root>Navigation links</VisuallyHidden.Root>
          </SheetDescription>
        </SheetHeader>
        <nav>
          <ul className="flex flex-col">
            {navLinks.map(({ label, href, icon }, idx) => {
              return (
                <React.Fragment key={label}>
                  <li>
                    <div className="py-3">
                      <SheetClose>
                        <MobileNavLink label={label} href={href} icon={icon} />
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
