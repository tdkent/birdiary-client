"use client";
import { useMediaQuery } from "usehooks-ts";
import { MobileNav } from "./MobileNav";

export default function Nav() {
  const isDesktop = useMediaQuery("(min-width:768px)");

  if (!isDesktop) {
    return <MobileNav />;
  }
  return (
    // return desktop nav
    <nav>Desktop nav goes here</nav>
  );
}
