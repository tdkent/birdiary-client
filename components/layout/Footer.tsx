import Link from "next/link";
import { getCookie } from "@/helpers/auth";
import Logo from "@/components/layout/Logo";

export const footerLinks: {
  label: string;
  href: string;
  protected: boolean;
}[] = [
  {
    label: "Home",
    href: "",
    protected: false,
  },
  {
    label: "New Sighting",
    href: "newsighting",
    protected: false,
  },
  {
    label: "Diary",
    href: "diary",
    protected: false,
  },
  {
    label: "Sightings",
    href: "sightings",
    protected: false,
  },
  {
    label: "Life List",
    href: "lifelist",
    protected: true,
  },
  {
    label: "Locations",
    href: "locations",
    protected: true,
  },
  {
    label: "Birdpedia",
    href: "birds",
    protected: false,
  },
  {
    label: "Profile",
    href: "profile",
    protected: true,
  },
];

export default async function Footer() {
  const token = await getCookie();
  const showProtected = token
    ? footerLinks
    : footerLinks.filter((link) => !link.protected);
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[1024px] flex-col gap-8 px-6 py-8 md:flex-row md:justify-between md:pl-8 md:pr-12">
        <Logo logoStyles="w-12 h-12" textStyles="text-3xl" />
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold uppercase md:text-lg">
            Sitemap
          </span>
          <ul className="flex flex-col gap-2 md:gap-3 md:text-lg">
            {showProtected.map(({ href, label }) => {
              return (
                <li key={label}>
                  <Link href={`/${href}`}>{label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="text-sm md:text-base">&copy; 2025, Birdiary</div>
      </div>
    </footer>
  );
}
