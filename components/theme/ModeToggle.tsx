"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function DarkMode() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className="w-fit hover:bg-transparent"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </>
  );
}
