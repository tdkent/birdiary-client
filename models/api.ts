import type { Bird } from "@/models/db";
import type { ListVariant, ListWithCount } from "@/models/display";
import { BASE_URL } from "@/constants/env";
import type { CountOfRecords, List } from "@/models/display";

// ======= CACHE =======

// The cache stores query functions that correspond to tags
// Tags represent slices of state
// The query functions can be called to update the state
// in response to mutations

export type Cache = {
  sightings: Array<() => void>;
  diary: Array<() => void>;
  locations: Array<() => void>;
};

export const defaultCache: Cache = {
  sightings: [],
  diary: [],
  locations: [],
};

/** Server request URLs */
export const apiRoutes = {
  signup: `${BASE_URL}/users/signup`,
  signin: `${BASE_URL}/users/signin`,
  bird: (id: number) => `${BASE_URL}/birds/${id}`,
  birds: (page: number, startsWith: string | undefined) =>
    `${BASE_URL}/birds?page=${page}${startsWith ? `&startsWith=${startsWith}` : ""}`,
  location: (id: number) => `${BASE_URL}/locations/${id}`,
  user: (id: number) => `${BASE_URL}/users/${id}`,
  locationDetails: (id: number) => "/sightings/locations/" + id,
  sighting: (id: number) => `${BASE_URL}/sightings/${id}`,
  sightings: `${BASE_URL}/sightings`,
  sightingsListByType: (
    type: "birdId" | "dateId" | "locationId",
    id: number | string,
    page: number,
    sortBy: string,
  ) => `${BASE_URL}/sightings?${type}=${id}&page=${page}&sortBy=${sortBy}`,
  sightingsGroupByType: (
    group: "date" | "lifelist" | "location",
    page: number,
    sortBy: string,
  ) => `${BASE_URL}/sightings?groupBy=${group}&page=${page}&sortBy=${sortBy}`,
  userProfile: "/users/profile",
} as const;

export type QueryParameters = {
  route: string;
  tag: "sightings" | "diary";
  variant: ListVariant;
};

export type MutationParameters = {
  route: string;
  tag: "sightings" | "locations";
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  tagsToUpdate: ("sightings" | "locations")[];
};

// ======= RESPONSES =======

export type ExpectedServerError = {
  error: string;
  statusCode: number;
  message: Exclude<string | string[], "ok">;
};

export enum Messages {
  ErrorToastTitle = "An error occurred",
  Success = "Success",
  NewSighting = "New sighting created!",
  SelectValidLocation = "Select a location from the dropdown menu",
  DefaultError = "An unexpected error occurred. Please try again later.",
}

export type MutationSuccess = {
  message: "ok";
};

export type CsrQuerySuccess = { data: ListWithCount };

export type QuerySuccess = {
  message: "ok";
  data: ListWithCount | Bird;
};

export type ServerResponseWithError = {
  error: string;
  statusCode: number;
  message: Exclude<string | string[], "ok">;
};
export type ServerResponseWithObject = Bird;
export type ServerResponseWithList = List & CountOfRecords;
