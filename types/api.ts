import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import type {
  BirdWithFamily,
  ListVariant,
  ListWithCount,
} from "@/types/models";

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

// ======= REQUESTS =======

export const apiRoutes = {
  birdDetails: (name: string) => "/birds/" + name,
  locationDetails: (id: string) => "/sightings/locations/" + id,
  usersSightings: "/sightings",
  sightingByBird: (name: string, page: string, sortBy: string) =>
    `/sightings/bird/${name}?page=${page}&sortBy=${sortBy}`,
  sightingsByDate: (date: string, page: string, sortBy: string) =>
    `/sightings/date/${date}?page=${page}&sortBy=${sortBy}`,
  sightingsByLocation: (id: string, page: string, sortBy: string) =>
    `/sightings/locations/${id}/all?page=${page}&sortBy=${sortBy}`,
  groupedSightings: (group: "date", page: string, sortBy: string) =>
    `/sightings?groupBy=${group}&page=${page}&sortBy=${sortBy}`,
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
  tag: "sightings";
  method: "POST" | "PUT" | "DELETE";
  tagsToUpdate: ["sightings"];
};

export const sightingSchema = z.object({
  commName: z.string(),
  date: z.date().optional(),
  desc: z.string().max(150).optional(),
  location: z.string().optional(),
});

export type SightingForm = z.infer<typeof sightingSchema>;
export type SightingFormProp = UseFormReturn<SightingForm>;

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

export type CsrQuerySuccess = {
  message: "ok";
  data: ListWithCount;
};

// export type QuerySuccess<T> = { data: T } & MutationSuccess;
export type QuerySuccess = {
  message: "ok";
  data: ListWithCount | BirdWithFamily;
};
