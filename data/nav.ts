import { LucideIcon } from "lucide-react";
import {
  Binoculars,
  Bird,
  CircleUserRound,
  House,
  MapPinned,
  NotebookPen,
  Scroll,
  UserPen,
} from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "Diary",
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
  {
    label: "Birdpedia",
    href: "/birds",
    icon: Bird,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: CircleUserRound,
  },
  {
    label: "Account",
    href: "/account",
    icon: UserPen,
  },
];

export default navLinks;
