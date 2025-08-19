import {
  Bird,
  CircleUserRound,
  LucideIcon,
  MapPinned,
  NotebookPen,
  Notebook,
  Plus,
} from "lucide-react";

export const mobile: {
  label: string;
  href: string;
  icon?: LucideIcon;
  type: "public" | "protected";
}[] = [
  {
    label: "New Sighting",
    href: "new",
    icon: Plus,
    type: "public",
  },
  {
    label: "Diary",
    href: "diary",
    icon: NotebookPen,
    type: "public",
  },
  {
    label: "Sightings",
    href: "sightings",
    icon: Notebook,
    type: "public",
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
    type: "protected",
  },
];
