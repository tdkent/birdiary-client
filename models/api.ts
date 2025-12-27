import { BASE_URL } from "@/constants/env";
import type { Bird } from "@/models/db";
import type {
  CountOfRecords,
  List,
  ListVariant,
  ListWithCount,
  SightingWithLocation,
} from "@/models/display";

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
  birdOfTheDay: `${BASE_URL}/bird-of-the-day`,
  birds: (
    page: number,
    searchTerm: string | undefined,
    startsWith: string | undefined,
  ) =>
    `${BASE_URL}/birds?page=${page}${searchTerm ? `&search=${searchTerm}` : ""}${startsWith ? `&startsWith=${startsWith}` : ""}`,
  getSightings: (page: number, sortBy: string) =>
    `${BASE_URL}/sightings?page=${page}&sortBy=${sortBy}`,
  getSightingsByBirdId: (id: number, page: number, sortBy: string) =>
    `${BASE_URL}/birds/${id}/sightings?page=${page}&sortBy=${sortBy}`,
  getSightingsByLocation: (id: number, page: number, sortBy: string) =>
    `${BASE_URL}/locations/${id}/sightings?page=${page}&sortBy=${sortBy}`,
  getSightingsGroupByType: (
    group: "date" | "lifelist" | "location",
    page: number,
    sortBy: string,
  ) => `${BASE_URL}/sightings?groupBy=${group}&page=${page}&sortBy=${sortBy}`,
  getSightingsListByType: (
    type: "birdId" | "dateId",
    id: number | string,
    page: number,
    sortBy: string,
  ) => `${BASE_URL}/sightings?${type}=${id}&page=${page}&sortBy=${sortBy}`,
  location: (id: number) => `${BASE_URL}/locations/${id}`,
  locations: (page: number, sortBy: string) =>
    `${BASE_URL}/locations?page=${page}&sortBy=${sortBy}`,
  sighting: (id: number) => `${BASE_URL}/sightings/${id}`,
  sightings: `${BASE_URL}/sightings`,
  signup: `${BASE_URL}/users/signup`,
  signin: `${BASE_URL}/users/signin`,
  user: `${BASE_URL}/users`,
  userExportData: `${BASE_URL}/users/export-data`,
  userFavoriteBird: `${BASE_URL}/users/favorite-bird`,
  userForgotPassword: `${BASE_URL}/users/forgot-password`,
  userPassword: `${BASE_URL}/users/password`,
  userResetPassword: `${BASE_URL}/users/forgot-password/complete`,
  userStats: `${BASE_URL}/users/stats`,
  userStorage: `${BASE_URL}/users/transfer-storage`,
  userVerifyResetPassword: (token: string) =>
    `${BASE_URL}/users/forgot-password?token=${token}`,
  userVerifyEmail: `${BASE_URL}/users/verify-email`,
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
  error: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
};

export enum Messages {
  LocationDeleted = "Location deleted",
  LocationUpdated = "Location updated",
  NewSighting = "New sighting created!",
  PasswordUpdated = "Password updated",
  ProfileUpdated = "Profile updated",
  ResetPasswordFormDescription = "This will reset the password you use to access your account.",
  SignIn = "You are signed in.",
  SignUp = "Your account has been created.",
  SightingCreated = "Sighting created",
  SightingDeleted = "Sighting deleted",
  SightingUpdated = "Sighting updated",
  SightingLocationUnknown = "No location",
  ToastErrorTitle = "Error!",
  ToastSuccessTitle = "Success!",
}

export type CsrQuerySuccess = { data: ListWithCount };

export type QuerySuccess = {
  message: "ok";
  data: ListWithCount | Bird;
};

export type ServerResponseWithObject = Bird | SightingWithLocation;
export type ServerResponseWithList = List & CountOfRecords;
