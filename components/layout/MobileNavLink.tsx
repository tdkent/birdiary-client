import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { SheetClose } from "../ui/sheet";

type MobileNavLinkProps = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

export default function MobileNavLink({
  label,
  href,
  icon: Icon,
}: MobileNavLinkProps) {
  return (
    <SheetClose asChild>
      <Link href={href}>
        <span className="flex items-center gap-2.5">
          {Icon && <Icon className="w-4 h-4" />}
          {label}
        </span>
      </Link>
    </SheetClose>
  );
}
