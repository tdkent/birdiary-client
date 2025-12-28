// API RESPONSE SHAPE -------------------- //
export type ApiResponse<T> =
  | {
      count: number;
      data: T;
      error: false;
      message: "ok";
      statusCode: number;
      timestamp: string;
    }
  | {
      count: null;
      data: null;
      error: true;
      message: string;
      statusCode: number;
      timestamp: string;
    };

// BIRDS -------------------- //

export type Bird = {
  id: number;
  commonName: string;
  scientificName: string;
  family: string;
  description: string;
  rarity: "Common" | "Uncommon" | "Rare";
  imgAttribute: string | null;
  imgPublicId: string | null;
  imgSecureUrl: string | null;
};

export type BirdWithCount = Bird & { count?: number };

// LOCATIONS -------------------- //

export type Location = {
  id: number;
  name: string;
  lat: number | undefined;
  lng: number | undefined;
};

export type LocationWithSightingsCount = Location & { count: number };

// SIGHTINGS -------------------- //

export type Sighting = {
  id: number;
  userId: number;
  birdId: number;
  locationId: number | null;
  date: string;
  description: string | null;
  isNew: boolean;
};

export type SightingWithBird = Sighting & { bird: Bird };
export type SightingWithLocation = Sighting & {
  location: Location | null;
};
export type SightingWithBirdAndLocation = Sighting & { bird: Bird } & {
  location: Location;
};

// USERS -------------------- //

export type User = {
  id: number;
  email: string;
  createdAt: string;
  name: string | null;
  bio: string | null;
  zipcode: string | null;
  address: string | null;
  favoriteBirdId: number | null;
};

export type LifeList = {
  id: number; // bird id
  date: string;
  commonName: string;
  imgSecureUrl: string;
  count: number;
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
