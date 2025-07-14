import {
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
    label: "Birdpedia",
    href: "birds",
    icon: Bird,
    type: "public",
  },
  {
    label: "Lifelist",
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
    label: "Profile",
    href: "profile",
    icon: CircleUserRound,
    type: "protected",
  },
  {
    label: "Account",
    href: "account",
    icon: UserPen,
    type: "protected",
  },
];

export const desktopSublinks = {
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
