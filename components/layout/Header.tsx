import { Separator } from "@/components/ui/separator";
import Logo from "@/components/layout/Logo";
import ResponsiveNav from "@/components/layout/ResponsiveNav";
import DarkMode from "@/components/theme/ModeToggle";
import SignInOutButton from "@/components/layout/SignInOutButton";

/**
 * Renders top-level site header and navigation elements.
 * Note: rendering issue with Separator and `items-center`: https://github.com/shadcn-ui/ui/issues/4818
 */
export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b px-6 sm:h-[88px] sm:px-6">
      <Logo />
      <div className="flex items-center gap-4">
        <ResponsiveNav />
        <Separator
          decorative
          orientation="vertical"
          className="min-h-10 bg-gray-700"
        />
        <SignInOutButton />
        <Separator
          decorative
          orientation="vertical"
          className="min-h-10 bg-gray-700"
        />
        <DarkMode />
      </div>
    </header>
  );
}
