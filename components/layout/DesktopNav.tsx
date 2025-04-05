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
import { CircleUserRound } from "lucide-react";
import { desktopSublinks as sublinks } from "@/data/nav";
import { AuthContext } from "@/context/AuthContext";

export default function DesktopNav() {
  const { isSignedIn } = useContext(AuthContext);
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
          <NavigationMenuLink asChild>
            <Link href="/diary" className={navigationMenuTriggerStyle()}>
              Diary
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

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
              <Link href="/lifelist" className={navigationMenuTriggerStyle()}>
                Lifelist
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

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
          {isSignedIn ? (
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
          ) : (
            <NavigationMenuLink asChild>
              <Link href="/profile" className={navigationMenuTriggerStyle()}>
                Profile
              </Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
