"use client";

// This context will store the entire application `state`
// State slices will be managed with tags that correspond to specific arrays
// The context will create two hooks: useQuery and useMutation
// useQuery will use `useEffect` to fetch data from a given resource on initial load
// useQuery will accept a `resource` parameter to direct fetch
// useMutation will perform "POST", "PUT", and "DELETE" requests
// useMutation will accept resource and method requests
// These hooks will change behavior based on auth status of user
// If logged in, requests will be directed to the API
// Otherwise, they will be directed to local storage
// Create a generic `request` function to use for fetch requests

import {
  defaultCache,
  Messages,
  type Cache,
  type MutationParameters,
  type QueryParameters,
  type ServerResponseWithError,
  type ServerResponseWithList,
} from "@/models/api";
import type { Sighting } from "@/models/db";
import type { CreateSightingDto } from "@/models/form";
import { createContext, useContext, useEffect, useState } from "react";
// import type { Group } from "@/models/display";
// import type { Sighting } from "@/models/db";
import { signOut as signOutAction } from "@/actions/auth";
import { useAuth } from "@/context/AuthContext";
import { getCookie } from "@/helpers/auth";
import { mutateStorage, queryStorage } from "@/helpers/storage";
import { Group, SightingInStorage } from "@/models/display";
import { toast } from "sonner";

// Define the shape of the API Context object
type Api = {
  useQuery: ({ route, tag }: QueryParameters) => {
    count: ServerResponseWithList["countOfRecords"];
    data: ServerResponseWithList["data"];
    error: string | null;
    pending: boolean;
  };
  useMutation: ({ route, method, tagsToUpdate }: MutationParameters) => {
    success: boolean;
    error: string | null;
    pending: boolean;
    mutate: <T>(body: T) => void;
    data: Sighting | SightingInStorage | null;
  };
};

// Create context with default values
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

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache, setCache] = useState<Cache>(defaultCache);

  function useQuery({ route, tag }: QueryParameters) {
    const [data, setData] = useState<ServerResponseWithList["data"]>([]);
    const [count, setCount] = useState<number>(-1);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const { signOut } = useAuth();

    useEffect(() => {
      async function query() {
        setError(null);
        const token = await getCookie();

        if (token) {
          setPending(true);
          try {
            const response = await fetch(route, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const result: ServerResponseWithList | ServerResponseWithError =
              await response.json();

            if ("error" in result) {
              if (result.statusCode === 401) {
                toast.error(Messages.InvalidToken);
                signOut();
                await signOutAction();
              }
              throw new Error(`${result.statusCode}`);
            }

            setData(result.data);
            setCount(result.countOfRecords);
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError(Messages.UnknownUnexpectedError);
            }
          } finally {
            setPending(false);
          }
        } else {
          const { items, countOfRecords } = queryStorage(route, tag);
          setData((items as SightingInStorage[] | Group[]) || []);
          setCount(countOfRecords);
        }
      }

      // Update the cache:
      // Use [tag] syntax to give property the name of the provided tag
      // Spread the current value of cache[tag] into the array (or [])
      // Append the query function (with the specific `resource` parameter) to the array value
      // This function can be called later when the tag is present in a mutation and the
      // data state value for that tag will be updated
      setCache({ ...cache, [tag]: [...(cache[tag] ?? []), query] });
      query();
    }, [route, signOut, tag]);

    return { count, data, error, pending };
  }

  function useMutation({
    route,
    tag,
    method,
    tagsToUpdate,
  }: MutationParameters) {
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState<Sighting | SightingInStorage | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const { signOut } = useAuth();

    async function mutate<T>(formValues: T) {
      setSuccess(false);
      const token = await getCookie();
      if (token) {
        setError(null);
        setPending(true);
        try {
          const response = await fetch(route, {
            method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formValues),
          });

          const result: Sighting | ServerResponseWithError =
            await response.json();

          if ("error" in result) {
            if (result.statusCode === 401) {
              toast.error(Messages.InvalidToken);
              signOut();
              await signOutAction();
            }
            throw new Error(`${result.statusCode}`);
          }

          setData(result);
          setSuccess(true);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError(Messages.UnknownUnexpectedError);
          }
        } finally {
          setPending(false);
        }
      }
      // Otherwise send mutation to browser storage
      else {
        const result: SightingInStorage = mutateStorage(
          tag,
          method,
          formValues as CreateSightingDto,
          route,
        );
        setData(result);
        setSuccess(true);
      }

      // Call the query functions attached to each tag
      // Update the data for all subscribed components
      // For each tag, call query() attached to same property in `cache`
      tagsToUpdate.forEach((tag) => cache[tag].forEach((query) => query()));
    }

    return { success, data, error, pending, mutate };
  }

  const value: Api = {
    useQuery,
    useMutation,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

// Put the context into a hook for ease of use and error handling
export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw new Error(Messages.ContextError);
  return context;
}
