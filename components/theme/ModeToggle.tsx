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
        size="sm"
        onClick={handleToggle}
        className="hover:bg-transparent"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <Sun
          strokeWidth={1.5}
          className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 md:max-lg:size-7"
        />
        <Moon
          strokeWidth={1.5}
          className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 md:max-lg:size-7"
        />
      </Button>
    </>
  );
}
