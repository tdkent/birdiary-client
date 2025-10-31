"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

export default function SearchForBird() {
  const [currInput, setCurrInput] = useState("");

  return (
    <>
      <div className="flex items-center">
        <Search />
        <Input onChange={(e) => setCurrInput(e.currentTarget.value)} />
        <Button size="icon">
          <ChevronRight />
        </Button>
      </div>
    </>
  );
}
