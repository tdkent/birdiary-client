"use client";
import { useMediaQuery } from "usehooks-ts";
import DesktopNav from "./DesktopNav";
import { MobileNav } from "./MobileNav";

/** Render mobile or desktop nav elements based on media query hook */
export default function ResponsiveNav() {
  const isDesktop = useMediaQuery("(min-width:1024px)");

  if (!isDesktop) {
    return <MobileNav />;
  }
  return <DesktopNav />;
}
