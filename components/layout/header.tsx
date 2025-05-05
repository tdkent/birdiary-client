import Logo from "@/components/layout/Logo";
import Nav from "@/components/layout/ResponsiveNav";
import DarkMode from "@/components/theme/ModeToggle";
import SignInOutButton from "@/components/layout/SignInOutButton";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 md:h-20">
      <Logo />
      <div className="flex gap-2">
        <Nav />
        <SignInOutButton />
        <DarkMode />
      </div>
    </header>
  );
}
