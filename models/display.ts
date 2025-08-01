import type { Bird, Location, Sighting, User } from "@/models/db";

export type BirdWithCount = Bird & { count?: number };
export type SightingWithBird = Sighting & { bird: Bird };
export type SightingWithLocation = SightingWithBird & {
  location: Location | null;
};
export type SightingInStorage = Pick<
  Sighting,
  "id" | "birdId" | "date" | "description"
> & { bird: { commonName: string } };
export type UserWithSightingsCount = User & {
  count: {
    totalSightings: number;
    totalDistinctSightings: number;
  };
};

export type UserProfile = User & {
  bird: Bird | null;
  count: {
    totalSightings: number;
    totalDistinctSightings: number;
  };
};

export type Group = {
  id: number;
  text: string;
  count: number;
};

// export type ListItem = SightingWithBird | SightingWithLocation | BirdWithCount | Group;

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
  | "sighting";

export type CountOfRecords = { countOfRecords: number };
export type List = {
  data:
    | SightingWithBird[]
    | SightingWithLocation[]
    | SightingInStorage[]
    | BirdWithCount[]
    | Group[];
};
