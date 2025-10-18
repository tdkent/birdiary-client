import type { Bird, Location, Sighting, User } from "@/models/db";

export type BirdWithCount = Bird & { count?: number };
export type LifeList = { id: number; date: string; commonName: string };
export type LocationWithSightingsCount = Location & { count: number };
export type SightingWithBird = Sighting & { bird: Bird };
export type SightingWithLocation = Sighting & {
  location: Location | null;
};
export type SightingWithBirdAndLocation = Sighting & { bird: Bird } & {
  location: Location;
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
    countOfAllSightings: number;
    countOfLifeListSightings: number;
  };
};

export type Group = {
  id: number;
  text: string;
  count: number;
};

export type Diary = {
  dateId: number;
  date: string;
  count: number;
  sightings: string[];
};

// export type ListItem = SightingWithBird | SightingWithLocation | BirdWithCount | Group;

export type ListWithCount = {
  data: Sighting[] | SightingWithLocation[] | BirdWithCount[] | Group[];
  countOfRecords: number;
};

export type ListVariant =
  | "birds"
  | "birdDetail"
  | "diary"
  | "diaryDetail"
  | "lifelist"
  | "location"
  | "locationDetail"
  | "sighting";

export type CountOfRecords = { countOfRecords: number };
export type List = {
  data:
    | BirdWithCount[]
    | Diary[] // Diary (list)
    | Group[]
    | LifeList[]
    | LocationWithSightingsCount[]
    | SightingWithBird[]
    | SightingWithBirdAndLocation[] // Bird Details (list)
    | SightingWithLocation[]
    | SightingInStorage[];
};
