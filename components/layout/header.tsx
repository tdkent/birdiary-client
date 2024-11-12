import Logo from "@/components/layout/Logo";
import Nav from "@/components/layout/nav";
import { ModeToggle } from "@/components/theme/mode-toggle";
import AuthButton from "@/components/layout/nav/AuthButton";

export default function Header() {
  return (
    <header className="flex px-4 justify-between items-center h-16 md:h-20  border-b">
      <Logo />
      <div className="flex gap-2">
        <Nav />
        <AuthButton />
        <ModeToggle />
      </div>
    </header>
  );
}
