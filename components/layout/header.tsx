import { caveat } from "@/lib/fonts";
import Nav from "./nav";
import { ModeToggle } from "@/components/theme/mode-toggle";
import Auth from "@/components/layout/nav/Auth";

export default function Header() {
  return (
    <header className="flex px-4 justify-between items-center h-20 border-b">
      <div>
        <span className={`${caveat.className} antialiased text-5xl`}>
          Birdiary
        </span>
      </div>
      <div className="flex gap-2">
        <Nav />
        <Auth />
        <ModeToggle />
      </div>
    </header>
  );
}
