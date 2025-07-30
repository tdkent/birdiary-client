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
                <ul className="w-24 p-0.5 text-sm">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/profile"
                      className={navigationMenuTriggerStyle()}
                    >
                      Profile
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/account"
                      className={navigationMenuTriggerStyle()}
                    >
                      Account
                    </Link>
                  </NavigationMenuLink>
                </ul>
              </NavigationMenuContent>
            </>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
