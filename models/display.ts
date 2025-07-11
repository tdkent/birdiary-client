import type { Bird, Location, Sighting, User } from "@/models/db";

export type BirdWithCount = Bird & {
  count?: number;
};

export type SightingWithBird = Sighting & { bird: Bird };

export type SightingWithLocation = SightingWithBird & {
  location: Location | null;
};

export type Group = {
  id: number;
  text: string;
  count: number;
};

export type ListItem = Sighting | SightingWithLocation | BirdWithCount | Group;

export type ListWithCount = {
  data: Sighting[] | SightingWithLocation[] | BirdWithCount[] | Group[];
  countOfRecords: number;
};

export type ListVariant =
  | "birdpedia"
  | "birdDetail"
  | "diary"
  | "diaryDetail"
  | "lifelistSighting"
  | "location"
  | "locationDetail"
  | "recentSighting";

export type UserWithSightingsCount = User & {
  count: {
    totalSightings: number;
    totalDistinctSightings: number;
  };
};

export type CountOfRecords = { countOfRecords: number };
export type List = {
  data: SightingWithBird[] | SightingWithLocation[] | BirdWithCount[] | Group[];
};
