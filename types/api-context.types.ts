import type { ListVariant } from "@/types/list-sort.types";
import type { Sighting } from "@/types/sighting.types";
import { StorageSighting } from "@/types/sighting.types";
import { createContext } from "react";

export type UseQueryInputs = {
  route: string;
  variant?: ListVariant;
};

export type UseMutationInputs = {
  route: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
};

export type Api = {
  useQuery: ({ route }: UseQueryInputs) => {
    count: number;
    data: unknown;
    error: string | null;
    pending: boolean;
  };
  useMutation: ({ route, method }: UseMutationInputs) => {
    success: boolean;
    error: string | null;
    pending: boolean;
    mutate: <T>(body: T) => void;
    data: Sighting | StorageSighting | null;
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
