import {
  Binoculars,
  Bird,
  CircleUserRound,
  House,
  LockKeyhole,
  LucideIcon,
  MapPinned,
  NotebookPen,
  Scroll,
  UserPen,
} from "lucide-react";

export const mobile: {
  label: string;
  href: string;
  icon?: LucideIcon;
  type: "public" | "protected" | "auth";
}[] = [
  {
    label: "Home",
    href: "",
    icon: House,
    type: "public",
  },
  {
    label: "Diary",
    href: "diary",
    icon: NotebookPen,
    type: "public",
  },
  {
    label: "My Birds",
    href: "sightings",
    icon: Binoculars,
    type: "public",
  },
  {
    label: "Life List",
    href: "lifelist",
    icon: Scroll,
    type: "public",
  },
  {
    label: "Locations",
    href: "locations",
    icon: MapPinned,
    type: "public",
  },
  {
    label: "Birdpedia",
    href: "birds",
    icon: Bird,
    type: "public",
  },
  {
    label: "Profile",
    href: "profile",
    icon: CircleUserRound,
    type: "public",
  },
  {
    label: "Account",
    href: "account",
    icon: UserPen,
    type: "protected",
  },
  {
    label: "Sign In",
    href: "signin",
    icon: LockKeyhole,
    type: "auth",
  },
];
