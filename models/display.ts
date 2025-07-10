import type { Bird, Sighting, User } from "@/models/db";

export type BirdWithCount = Bird & {
  count?: number;
};

export type SightingWithLocation = Sighting & {
  location: Location | null;
};

export type Group = {
  id: number;
  text: string;
  count: number;
};

export type ListItem = Sighting | SightingWithLocation | BirdWithCount | Group;

export type ListWithCount = {
  items: Sighting[] | SightingWithLocation[] | BirdWithCount[] | Group[];
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
