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
  birdOfTheDay: `${BASE_URL}/birdoftheday`,
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
  userExportData: `${BASE_URL}/users/exportdata`,
  userFavoriteBird: `${BASE_URL}/users/favoritebird`,
  userForgotPassword: `${BASE_URL}/users/forgotpassword`,
  userPassword: `${BASE_URL}/users/password`,
  userResetPassword: `${BASE_URL}/users/forgotpassword/complete`,
  userStats: `${BASE_URL}/users/stats`,
  userStorage: `${BASE_URL}/users/transferstorage`,
  userVerifyResetPassword: (token: string) =>
    `${BASE_URL}/users/forgotPassword?token=${token}`,
  userVerifyResend: `${BASE_URL}/verify`,
  userVerifyComplete: `${BASE_URL}/verify/complete`,
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
  message: string;
};

export enum Messages {
  BioValidationError = "Bio must be 150 or fewer characters.",
  ContextError = "Context must be used within a provider.",
  DescriptionValidationError = "Description must be 150 or fewer characters.",
  EmailValidationError = "Please enter a valid email address.",
  ForbiddenError = "You do not have access to this resource. Please try signing in again.",
  InvalidLocationError = "Select a location from the dropdown menu.",
  InvalidRequest = "Invalid request",
  BadRequestFailedValidation = "Request validation failed. Please try again.",
  InvalidSwitchCase = "The provided switch case is not valid.",
  InvalidToken = "Session expired, please log in again.",
  InvalidZipcode = "Invalid zip code",
  LocationDeleted = "Location deleted",
  LocationUpdated = "Location updated",
  NameValidationError = "Name must be 24 or fewer characters.",
  NewSighting = "New sighting created!",
  NotFoundError = "The requested resource could not be found.",
  PasswordUpdated = "Password updated",
  PasswordValidationError = "Password length must be 8-64 characters.",
  ProfileUpdated = "Profile updated",
  ResetPasswordFormDescription = "This will reset the password you use to access your account.",
  SearchValidationError = "Search must be 3-32 characters",
  SignIn = "You are signed in.",
  SignUp = "Your account has been created.",
  SightingCreated = "Sighting created",
  SightingDeleted = "Sighting deleted",
  SightingUpdated = "Sighting updated",
  SightingLocationUnknown = "No location",
  ToastErrorTitle = "Error!",
  ToastSuccessTitle = "Success!",
  UnknownUnexpectedError = "An unexpected error occurred. Refreshing the page may help, or you can try again later.",
  ZipCodeValidationError = "Input must be a valid 5-digit zip code.",
  ZipCodeNoResultsError = "The provided zip code did not return any results.",
}

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
