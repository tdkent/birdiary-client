// Note: there is a rendering issue with Separator and `items-center`
// https://github.com/shadcn-ui/ui/issues/4818
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/layout/Logo";
import Nav from "@/components/layout/ResponsiveNav";
import DarkMode from "@/components/theme/ModeToggle";
import SignInOutButton from "@/components/layout/SignInOutButton";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 md:h-20">
      <Logo />
      <div className="flex items-center gap-4">
        <Nav />
        <Separator
          decorative
          orientation="vertical"
          className="min-h-8 bg-gray-700 md:hidden"
        />
        <SignInOutButton />
        <Separator
          decorative
          orientation="vertical"
          className="min-h-8 bg-gray-700 md:hidden"
        />
        <DarkMode />
      </div>
    </header>
  );
}
