import { Location } from "@/models/db";

export type CreateLocationDto = Pick<Location, "lat" | "lng" | "name">;
export type CreateSightingDto = {
  birdId: number;
  date: string;
  description: string | null;
  location?: CreateLocationDto;
};

// Form controls
//? Merge with SortValues
export type DiarySortOptions = "dateDesc" | "dateAsc" | "sightings";

export type SortValues =
  | "alphaAsc"
  | "alphaDesc"
  | "dateAsc"
  | "dateDesc"
  | "count"
  | "";

export type SortOptions = { value: SortValues; text: string }[];

export const sortByAlphaOptions = [
  { value: "alphaAsc", text: "A - Z" },
  { value: "alphaDesc", text: "Z - A" },
] as const;

export const sortByDateOptions = [
  { value: "dateAsc", text: "Oldest - Newest" },
  { value: "dateDesc", text: "Newest - Oldest" },
] as const;

export const sortBySightingsCount = {
  value: "count",
  text: "Most Sightings",
} as const;
