import { roboto_mono } from "@/lib/fonts";
import Nav from "./nav";
import { ModeToggle } from "@/components/theme/mode-toggle";
import Auth from "@/components/layout/nav/Auth";

export default function Header() {
  return (
    <header className="flex px-4 justify-between items-center h-20 border-b">
      <h1 className={`${roboto_mono.className} antialiased`}>Birdiary</h1>
      <div className="flex gap-4">
        <Nav />
        <ModeToggle />
        <Auth />
      </div>
    </header>
  );
}
