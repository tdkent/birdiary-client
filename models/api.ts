import type { Bird } from "@/models/db";
import type {
  ListVariant,
  ListWithCount,
  SightingWithLocation,
} from "@/models/display";
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
};

export const defaultCache: Cache = {
  sightings: [],
  diary: [],
};

/** Server request URLs */
export const apiRoutes = {
  bird: (id: number) => `${BASE_URL}/birds/${id}`,
  birds: (page: number, startsWith: string | undefined) =>
    `${BASE_URL}/birds?page=${page}${startsWith ? `&startsWith=${startsWith}` : ""}`,
  getSightings: (page: number, sortBy: string) =>
    `${BASE_URL}/sightings?page=${page}&sortBy=${sortBy}`,
  getSightingsGroupByType: (
    group: "date" | "lifelist" | "location",
    page: number,
    sortBy: string,
  ) => `${BASE_URL}/sightings?groupBy=${group}&page=${page}&sortBy=${sortBy}`,
  getSightingsListByType: (
    type: "birdId" | "dateId" | "locationId",
    id: number | string,
    page: number,
    sortBy: string,
  ) => `${BASE_URL}/sightings?${type}=${id}&page=${page}&sortBy=${sortBy}`,
  location: (id: number) => `${BASE_URL}/locations/${id}`,
  sighting: (id: number) => `${BASE_URL}/sightings/${id}`,
  sightings: `${BASE_URL}/sightings`,
  signup: `${BASE_URL}/users/signup`,
  signin: `${BASE_URL}/users/signin`,
  user: (id: number) => `${BASE_URL}/users/${id}`,
  userPassword: (id: number) => `${BASE_URL}/users/${id}/password`,
} as const;

export type QueryParameters = {
  route: string;
  tag: "sightings" | "diary";
  variant: ListVariant;
};

export type MutationParameters = {
  route: string;
  tag: "sightings";
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  tagsToUpdate: "sightings"[];
};

// ======= RESPONSES =======

export type ExpectedServerError = {
  error: string;
  statusCode: number;
  message: Exclude<string | string[], "ok">;
};

export enum Messages {
  ToastErrorTitle = "Error!",
  ToastSuccessTitle = "Success!",
  NewSighting = "New sighting created!",
  EmailValidationError = "Please enter a valid email address.",
  PasswordValidationError = "Passwords must 8-36 characters.",
  InvalidLocationError = "Select a location from the dropdown menu.",
  ZipCodeValidationError = "Input must be a valid 5-digit zip code.",
  ZipCodeNoResultsError = "The provided zip code did not return any results.",
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
export type ServerResponseWithObject = Bird | SightingWithLocation;
export type ServerResponseWithList = List & CountOfRecords;
