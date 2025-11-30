import { Cabin, Caveat, Quicksand, Short_Stack } from "next/font/google";

export const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const shortStack = Short_Stack({
  subsets: ["latin"],
  weight: ["400"],
});
