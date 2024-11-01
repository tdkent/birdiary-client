"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

export function SheetSide() {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-4/5">
        <SheetHeader>
          <SheetTitle>birDiary</SheetTitle>
        </SheetHeader>
        {/* NavLinks */}
      </SheetContent>
    </Sheet>
  );
}
