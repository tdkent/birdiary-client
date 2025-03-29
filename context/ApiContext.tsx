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

import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  defaultCache,
  ErrorMessages,
  type Cache,
  type QueryParameters,
  type MutationParameters,
  type ExpectedServerError,
  type QuerySuccess,
  type MutationSuccess,
} from "@/types/api";
import { getCookie } from "@/helpers/auth";
import { BASE_URL } from "@/constants/env";

// Define the shape of the API Context object
type Api = {
  useQuery: <T>({ route, key, tag }: QueryParameters) => {
    data: T[];
    error: string | null;
    pending: boolean;
  };
  useMutation: ({ route, key, method, tagsToUpdate }: MutationParameters) => {
    success: boolean;
    error: string | null;
    pending: boolean;
    mutate: <T>(body: T) => void;
  };
};

// Create context with default values
export const ApiContext = createContext<Api>({
  useQuery: () => ({ data: [], error: null, pending: false }),
  useMutation: () => ({
    success: false,
    error: null,
    pending: false,
    mutate: () => {},
  }),
});

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache, setCache] = useState<Cache>(defaultCache);

  function useQuery<T>({ route, key, tag }: QueryParameters) {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    useEffect(() => {
      async function query() {
        // Clear error state
        setError(null);
        // Check user's auth status
        const token = await getCookie();

        // If user is signed in send query to server
        if (token) {
          setPending(true);
          try {
            const response = await fetch(BASE_URL + route, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const data: QuerySuccess<T[]> | ExpectedServerError =
              await response.json();

            if ("error" in data) {
              const msg = Array.isArray(data.message)
                ? data.message.join(",")
                : data.message;
              throw new Error(`${data.error}: ${msg}`);
            }

            setData(data.data);
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            } else {
              setError(ErrorMessages.Default);
            }
          } finally {
            setPending(false);
          }
        }

        // Otherwise send query to browser storage
        else {
          // Add default empty array to storage
          if (!window.localStorage.getItem(key)) {
            window.localStorage.setItem(key, "[]");
          }
          // Fetch data from local storage based on `key` parameter
          const data: T[] = JSON.parse(window.localStorage.getItem(key)!);

          setData(data);
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
    }, [key, route, tag]);

    return { data, error, pending };
  }

  function useMutation({
    route,
    key,
    method,
    tagsToUpdate,
  }: MutationParameters) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    async function mutate<T>(formValues: T) {
      setSuccess(false);
      const token = await getCookie();
      // If user is signed in send mutation to server
      if (token) {
        setError(null);
        setPending(true);
        try {
          const response = await fetch(BASE_URL + route, {
            method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formValues),
          });

          const data: ExpectedServerError | MutationSuccess =
            await response.json();

          if ("error" in data) {
            const msg = Array.isArray(data.message)
              ? data.message.join(",")
              : data.message;
            throw new Error(`${data.error}: ${msg}`);
          }

          setSuccess(true);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError(ErrorMessages.Default);
          }
        } finally {
          setPending(false);
        }
      }
      // Otherwise send mutation to browser storage
      else {
        // Check if local storage contains the provided key
        // If the key does not exist, initialize with an empty array
        if (!window.localStorage.getItem(key)) {
          window.localStorage.setItem(key, "[]");
        }

        // Fetch data from local storage based on `key` parameter
        const data: T[] = JSON.parse(window.localStorage.getItem(key)!);

        // Update the data based on HTTP `method` parameter
        if (method === "POST") {
          if (key === "sightings") {
            data.unshift({
              sightingId: uuidv4(),
              ...formValues,
            });
          }
        }
        // Set the updated data in local storage
        localStorage.setItem(key, JSON.stringify(data));
        setSuccess(true);
      }

      // Call the query functions attached to each tag
      // Update the data for all subscribed components
      // For each tag, call query() attached to same property in `cache`
      tagsToUpdate.forEach((tag) => cache[tag].forEach((query) => query()));
    }

    return { success, error, pending, mutate };
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
  if (!context) throw new Error("Error accessing context");
  return context;
}
