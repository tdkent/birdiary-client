import { useContext } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
              href="/newsighting"
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

        {isSignedIn && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/profile" className={navigationMenuTriggerStyle()}>
                <CircleUserRound className="h-4 w-4" />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
