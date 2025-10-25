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
    newestFavSighting: string;
    oldestFavSighting: string;
    newestSighting: string;
    oldestSighting: string;
    newestLifeListSighting: {
      birdId: number;
      commonName: string;
      date: string;
      sightingId: number;
    };
    topThreeBirds: {
      birdId: number;
      commonName: string;
      count: number;
    }[];
    topThreeDates: {
      count: number;
      date: string;
    }[];
    topThreeFamilies: {
      count: number;
      family: string;
    }[];
    topThreeLocations: {
      count: number;
      locationId: number;
      name: string;
    }[];
  };
};

export type Group = {
  id: number;
  text: string;
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
  sightings: string[];
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
