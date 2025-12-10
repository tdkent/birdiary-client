import type { Bird, Location, Sighting, User } from "@/models/db";

export type BirdWithCount = Bird & { count?: number };
export type LifeList = {
  id: number; // bird id
  date: string;
  commonName: string;
  imgSecureUrl: string;
  count: number;
};
export type LocationWithSightingsCount = Location & { count: number };
export type SightingWithBird = Sighting & { bird: Bird };
export type SightingWithLocation = Sighting & {
  location: Location | null;
};
export type SightingWithBirdAndLocation = Sighting & { bird: Bird } & {
  location: Location;
};

export type UserWithSightingsCount = User & {
  count: {
    totalSightings: number;
    totalDistinctSightings: number;
  };
};

type UserWithFavoriteBird = User & { bird: Bird };

export type UserProfile = UserWithFavoriteBird & {
  count: {
    countOfAllSightings: number;
    countOfLifeListSightings: number;
  };
};

export type UserStats = {
  user: UserWithFavoriteBird;
  stats: {
    countOfAllSightings: number;
    countOfCommonSightings: number;
    countOfFavBirdSightings: number;
    countOfLifeListSightings: number;
    countOfRareSightings: number;
    countOfSightingsWithoutLocation: number;
    countOfUncommonSightings: number;
    newestFavSighting: string | null;
    oldestFavSighting: string | null;
    newestSighting: string | null;
    oldestSighting: string | null;
    newestLifeListSighting: {
      birdId: number;
      commonName: string;
      date: string;
      sightingId: number;
    } | null;
    topThreeBirds:
      | {
          birdId: number;
          commonName: string;
          count: number;
        }[]
      | null;
    topThreeDates:
      | {
          count: number;
          date: string;
        }[]
      | null;
    topThreeFamilies:
      | {
          count: number;
          family: string;
        }[]
      | null;
    topThreeLocations:
      | {
          count: number;
          locationId: number;
          name: string;
        }[]
      | null;
  };
};

export type Group = {
  id: number;
  date: string;
  count: number;
};

export type Diary = {
  id: number; // (e.g. 20250101)
  date: string;
  count: number;
  sightings: string[];
};

export type LocationWithCount = {
  id: number; // location id
  count: number;
  name: string;
  sightings: string[] | null;
};

export type ListWithCount = {
  data: Sighting[] | SightingWithLocation[] | BirdWithCount[] | Group[];
  countOfRecords: number;
};

export type ListVariant =
  | "birds"
  | "birdDetail"
  | "diary"
  | "diaryDetail"
  | "lifeList"
  | "locations"
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

/** Storage types */

export type DiaryInStorage = Omit<Diary, "sightings">;
export type SightingInStorage = Pick<
  Sighting,
  "id" | "birdId" | "date" | "description"
> & { bird: Pick<Bird, "commonName"> };
