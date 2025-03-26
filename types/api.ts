import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// ======= CACHE =======

// The cache stores query functions that correspond to tags
// Tags represent slices of state
// The query functions can be called to update the state
// in response to mutations

export type Cache = {
  sightings: Array<() => void>;
  locations: Array<() => void>;
};

export const defaultCache: Cache = {
  sightings: [],
  locations: [],
};

// ======= REQUESTS =======

// Local storage key and web server route
// Standard params for GET requests
export type QueryParameters = {
  key: "sightings";
  route: string;
  tag: "sightings" | "locations";
};

// Capture all information needed for POST, PATCH, DELETE requests
export type MutationParameters = Omit<QueryParameters, "tag"> & {
  method: "POST" | "PATCH" | "DELETE";
  tagsToUpdate: ["sightings" | "locations"];
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

/** 
Expected errors received from the server
`error`: Name of the error
`statusCode`: Status code of the error
`message`: string[] if Nest validation error; string if generic error

Example expected validation error:
{
  error: "Bad Request",
  statusCode: 400,
  message: [
    "bird_id must not be less than 1",
    "maximal allowed date for date is Sun Feb 23 2025 15:53:48 GMT-0800 (Pacific Standard Time)"
  ]
}

Example expected generic server error:
{
  error: "Bad Request",
  statusCode: 400,
  message: 'The server encountered an error'
}
*/

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

export type QuerySuccess<T> = { data: T } & MutationSuccess;
