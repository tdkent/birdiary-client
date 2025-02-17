import Logo from "@/components/layout/Logo";
import Nav from "@/components/layout/ResponsiveNav";
import { ModeToggle } from "@/components/theme/mode-toggle";
import SignInOutButton from "@/components/layout/SignInOutButton";

export default function Header() {
  return (
    <header className="flex px-4 justify-between items-center h-16 md:h-20 border-b">
      <Logo />
      <div className="flex gap-2">
        <Nav />
        <SignInOutButton />
        <ModeToggle />
      </div>
    </header>
  );
}
