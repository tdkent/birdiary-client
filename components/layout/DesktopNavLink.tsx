import Link from "next/link";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";

type NavLinkProps = {
  label: string;
  href: string;
};

export default function DesktopNavLink({ label, href }: NavLinkProps) {
  return (
    <Link href={href} className={navigationMenuTriggerStyle()}>
      <span className="flex items-center gap-2.5">{label}</span>
    </Link>
  );
}
