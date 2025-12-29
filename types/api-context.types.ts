import type { Sighting } from "@/models/db";
import type { ListVariant, SightingInStorage } from "@/models/display";
import { createContext } from "react";

export type UseQueryInputs = {
  route: string;
  tag: "sightings" | "diary";
  variant: ListVariant;
};

export type UseMutationInputs = {
  route: string;
  tag: "sightings";
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  tagsToUpdate: "sightings"[];
};

export type Api = {
  useQuery: ({ route, tag }: UseQueryInputs) => {
    count: number;
    data: unknown;
    error: string | null;
    pending: boolean;
  };
  useMutation: ({ route, method, tagsToUpdate }: UseMutationInputs) => {
    success: boolean;
    error: string | null;
    pending: boolean;
    mutate: <T>(body: T) => void;
    data: Sighting | SightingInStorage | null;
  };
};

export const ApiContext = createContext<Api>({
  useQuery: () => ({ count: 0, data: [], error: null, pending: false }),
  useMutation: () => ({
    success: false,
    error: null,
    pending: false,
    mutate: () => {},
    data: null,
  }),
});

export type Cache = {
  sightings: Array<() => void>;
  diary: Array<() => void>;
};

export const defaultCache: Cache = {
  sightings: [],
  diary: [],
};
