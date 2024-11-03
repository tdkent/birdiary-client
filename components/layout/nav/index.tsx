"use client";
import { useMediaQuery } from "usehooks-ts";
import DesktopNav from "./Desktop";
import { MobileNav } from "./Mobile";

export default function Nav() {
  const isDesktop = useMediaQuery("(min-width:768px)");

  if (!isDesktop) {
    return <MobileNav />;
  }
  return <DesktopNav />;
}
