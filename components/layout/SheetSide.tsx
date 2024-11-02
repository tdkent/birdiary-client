"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { AlignJustify } from "lucide-react";
import MobileNav from "./MobileNav";

export function SheetSide() {
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
        <MobileNav />
      </SheetContent>
    </Sheet>
  );
}
