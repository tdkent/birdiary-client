import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Binoculars,
  CircleUserRound,
  LockKeyhole,
  MapPinned,
  NotebookPen,
  Scroll,
} from "lucide-react";

const subLinks = {
  diary: [
    {
      label: "My Diary",
      href: "/diary",
      icon: NotebookPen,
    },
    {
      label: "My Birds",
      href: "/sightings",
      icon: Binoculars,
    },
    {
      label: "Life List",
      href: "/lifelist",
      icon: Scroll,
    },
    {
      label: "Locations",
      href: "/locations",
      icon: MapPinned,
    },
  ],
  user: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Account",
      href: "/account",
    },
  ],
  auth: [
    {
      label: "Log In",
      href: "/signin",
    },
    {
      label: "Register",
      href: "/signup",
    },
  ],
};

export default function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" className={navigationMenuTriggerStyle()}>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Diary</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuList className="flex flex-col border justify-start items-start">
              {subLinks.diary.map(({ label, href, icon: Icon }) => {
                return (
                  <NavigationMenuItem key={label}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="flex gap-2 items-center">
                          {Icon && <Icon className="w-4 h-4" />}
                          {label}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/birds" className={navigationMenuTriggerStyle()}>
              Birdpedia
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <CircleUserRound className="w-4 h-4" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuList className="flex flex-col border justify-start items-start">
              {subLinks.user.map(({ label, href }) => {
                return (
                  <NavigationMenuItem key={label}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="flex gap-2 items-center">{label}</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <LockKeyhole className="w-4 h-4" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuList className="flex flex-col border justify-start items-start">
              {subLinks.auth.map(({ label, href }) => {
                return (
                  <NavigationMenuItem key={label}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="flex gap-2 items-center">{label}</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
