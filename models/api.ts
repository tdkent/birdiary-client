import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import type { Bird } from "@/models/db";
import type { ListVariant, ListWithCount } from "@/models/display";
import { SignupFormSchema } from "@/lib/definitions";
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
  getBird: (id: number) => `${BASE_URL}/birds/${id}`,
  locationDetails: (id: number) => "/sightings/locations/" + id,
  recentSightings: "/sightings",
  sightingsListByType: (
    type: "birdId" | "dateId" | "locationId",
    id: number | string,
    page: number,
    sortBy: string,
  ) => `/sightings?${type}=${id}&page=${page}&sortBy=${sortBy}`,
  sightingsGroupByType: (group: "date", page: string, sortBy: string) =>
    `/sightings?groupBy=${group}&page=${page}&sortBy=${sortBy}`,
  sightingsByBird: (id: number, page: number, sortBy: string) =>
    `/sightings?birdId=${id}&page=${page}&sortBy=${sortBy}`,
  sightingsByDate: (date: string, page: string, sortBy: string) =>
    `/sightings/date/${date}?page=${page}&sortBy=${sortBy}`,
  sightingsByLocation: (id: number, page: string, sortBy: string) =>
    `/sightings/locations/${id}/all?page=${page}&sortBy=${sortBy}`,
  singleSighting: (id: number) => `/sightings/${id}`,
  singleLocation: (id: number) => `/sightings/locations/${id}`,
  userProfile: "/users/profile",
} as const;

export type QueryParameters = {
  route: string;
  tag: "sightings" | "diary";
  variant: ListVariant;
};

// Capture all information needed for POST, PATCH, DELETE requests
export type MutationParameters = {
  route: string;
  tag: "sightings" | "locations";
  method: "POST" | "PUT" | "DELETE";
  tagsToUpdate: ("sightings" | "locations")[];
};

export const sightingSchema = z.object({
  commName: z.string(),
  date: z.date().optional(),
  desc: z.string().max(150).optional(),
  location: z.string().optional(),
});

export type AuthForm = z.infer<typeof SignupFormSchema>;
export type AuthFormProp = UseFormReturn<AuthForm>;

export type SightingForm = z.infer<typeof sightingSchema>;
export type SightingFormProp = UseFormReturn<SightingForm>;

export const editLocationSchema = z.object({
  location: z.string().min(1),
});

export type EditLocationFormSchema = z.infer<typeof editLocationSchema>;
export type EditLocationFormSchemaProp = UseFormReturn<EditLocationFormSchema>;

// ======= RESPONSES =======

export type ExpectedServerError = {
  error: string;
  statusCode: number;
  message: Exclude<string | string[], "ok">;
};

export enum ErrorMessages {
  Default = "An unexpected error occurred. Please try again later.",
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
