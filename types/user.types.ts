import type { Bird } from "@/types/bird.types";

export type User = {
  address: string | null;
  bio: string | null;
  createdAt: string;
  email: string;
  favoriteBirdId: number | null;
  id: number;
  name: string | null;
  zipcode: string | null;
};

export type UserWithBird = User & { bird: Bird | null };

export type UserWithCountAndBird = UserWithBird & {
  count: {
    countOfAllSightings: number;
    countOfLifeListSightings: number;
  };
};

export type UpdateProfile = Pick<User, "address" | "bio" | "name" | "zipcode">;

export type UserSightingStats = {
  user: UserWithBird;
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
