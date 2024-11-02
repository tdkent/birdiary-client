import { roboto_mono } from "../../app/fonts";
import { SheetSide } from "./SheetSide";
import { ModeToggle } from "../theme/mode-toggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center h-20 border-b">
      <h1 className={`${roboto_mono.className} antialiased`}>Birdiary</h1>
      <SheetSide />
      <ModeToggle />
    </header>
  );
}
