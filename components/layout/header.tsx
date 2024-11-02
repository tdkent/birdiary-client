import { roboto_mono } from "../../app/fonts";
import Nav from "./Nav";
import { ModeToggle } from "../theme/mode-toggle";

export default function Header() {
  return (
    <header className="flex px-4 justify-between items-center h-20 border-b">
      <h1 className={`${roboto_mono.className} antialiased`}>Birdiary</h1>
      <div className="flex gap-4">
        <Nav />
        <ModeToggle />
      </div>
    </header>
  );
}
