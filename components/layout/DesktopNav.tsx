import { useContext } from "react";
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
import { CircleUserRound, Plus } from "lucide-react";
import { desktopSublinks as sublinks } from "@/data/nav";
import { AuthContext } from "@/context/AuthContext";

/** Desktop navigation links */
export default function DesktopNav() {
  const { isSignedIn } = useContext(AuthContext);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/new"
              className={`${navigationMenuTriggerStyle()} flex items-center gap-1 rounded-md border`}
            >
              <Plus size={12} />
              New
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/diary" className={navigationMenuTriggerStyle()}>
              Diary
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/sightings" className={navigationMenuTriggerStyle()}>
              Sightings
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {isSignedIn && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/locations" className={navigationMenuTriggerStyle()}>
                Locations
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/birds" className={navigationMenuTriggerStyle()}>
              Birdpedia
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          {isSignedIn && (
            <>
              <NavigationMenuTrigger>
                <CircleUserRound className="h-4 w-4" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuList className="flex flex-col items-start justify-start border">
                  {sublinks.user.map(({ label, href }) => {
                    return (
                      <NavigationMenuItem key={label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={href}
                            className={navigationMenuTriggerStyle()}
                          >
                            <span className="flex items-center gap-2">
                              {label}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenuContent>
            </>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
