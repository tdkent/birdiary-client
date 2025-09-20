import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";
import { CircleUserRound, Plus } from "lucide-react";
import Link from "next/link";

/** Desktop navigation links */
export default function DesktopNav() {
  const { isSignedIn } = useAuth();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/newsighting"
              className={`${navigationMenuTriggerStyle()} flex items-center gap-1`}
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
              <Link
                href="/profile"
                className={navigationMenuTriggerStyle()}
                aria-label="Profile"
              >
                <CircleUserRound strokeWidth={1.5} className="size-6" />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
