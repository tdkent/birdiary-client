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
      <div className="mx-auto flex max-w-[1024px] flex-col gap-10 px-6 py-8 md:gap-12 md:pl-8 md:pr-12">
        <Logo logoStyles="w-12 h-12" textStyles="text-3xl" />
        <div className="bo flex w-full flex-col gap-4 md:flex-row">
          <span className="text-base font-semibold max-md:uppercase lg:text-lg">
            Sitemap
          </span>
          <ul className="flex w-full flex-col gap-4 md:flex-row md:justify-evenly md:gap-0 lg:text-lg">
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
