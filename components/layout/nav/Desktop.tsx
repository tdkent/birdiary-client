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
import { CircleUserRound } from "lucide-react";
import { desktopSublinks as sublinks } from "@/data/nav";

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
              {sublinks.diary.map(({ label, href, icon: Icon }) => {
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
              {sublinks.user.map(({ label, href }) => {
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
