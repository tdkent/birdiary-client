export type ListVariant =
  | "birds"
  | "birdDetail"
  | "diary"
  | "diaryDetail"
  | "lifeList"
  | "locations"
  | "locationDetail"
  | "sighting";

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
