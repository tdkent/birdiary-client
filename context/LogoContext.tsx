"use client";

import { Messages } from "@/models/api";
import { createContext, useContext, useEffect, useState } from "react";

export const logoImgs = [
  "Blue-Jay",
  "Emperor-Goose",
  "Northern-Cardinal",
  "Painted-Bunting",
];

type LogoState = {
  img: string;
  alt: string;
};

export const LogoContext = createContext<LogoState>({
  img: "",
  alt: "",
});

export default function LogoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [img, setImg] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    const selectedImg = logoImgs[Math.floor(Math.random() * 4)];
    setImg(selectedImg);
    setAlt(selectedImg.split("-").join(" "));
  }, []);

  const value: LogoState = { img, alt };

  return <LogoContext.Provider value={value}>{children}</LogoContext.Provider>;
}

export function useLogo() {
  const context = useContext(LogoContext);
  if (!context) throw new Error(Messages.ContextError);
  return context;
}
