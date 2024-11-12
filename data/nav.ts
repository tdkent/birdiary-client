import {
  Binoculars,
  Bird,
  CircleUserRound,
  House,
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
  type: "public" | "protected";
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
    type: "protected",
  },
  {
    label: "Life List",
    href: "lifelist",
    icon: Scroll,
    type: "protected",
  },
  {
    label: "Locations",
    href: "locations",
    icon: MapPinned,
    type: "protected",
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
];

export const desktopSublinks = {
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
};
