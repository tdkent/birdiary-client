"use client";

import { deleteSessionCookie } from "@/actions/auth";
import { useAuth } from "@/context/AuthContext";
import { getCookie } from "@/helpers/auth";
import { mutateStorage, queryStorage } from "@/helpers/storage";
import { Group, SightingInStorage } from "@/models/display";
import {
  Api,
  ApiContext,
  type Cache,
  defaultCache,
  type UseMutationInputs,
  type UseQueryInputs,
} from "@/types/api-context.types";
import type { ApiResponse } from "@/types/api.types";
import { ErrorMessages } from "@/types/error-messages.enum";
import type { CreateSightingDto } from "@/types/list-sort.types";
import type { Sighting } from "@/types/sighting.types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Store query functions corresponding to tags.
  const [cache, setCache] = useState<Cache>(defaultCache);

  /** Fetch from server or browser in client components. */
  function useQuery({ route, tag }: UseQueryInputs) {
    const [data, setData] = useState<unknown>([]);
    const [count, setCount] = useState<number>(-1);
    const [error, setError] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<Error | null>(null);
    const [pending, setPending] = useState(false);

    const { signOut } = useAuth();
    const router = useRouter();

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

            const result: ApiResponse<unknown> = await response.json();

            if (result.error) {
              if (result.statusCode === 401) {
                toast.error(ErrorMessages.InvalidSession);
                signOut();
                deleteSessionCookie();
                router.replace("/signin");
              }
              return setError(result.message);
            }

            setData(result.data);
            setCount(result.count);
          } catch (error) {
            console.error(error);
            if (error instanceof Error) {
              setFetchError(error);
            } else {
              setError(ErrorMessages.ServerOutage);
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

      // Add query function and corresponding tag to cache state.
      setCache({ ...cache, [tag]: [...(cache[tag] ?? []), query] });
      query();
    }, [route, router, signOut, tag]);

    if (fetchError) throw fetchError;

    return { count, data, error, pending };
  }

  /** Mutations on server or browser in client components. */
  function useMutation({
    route,
    tag,
    method,
    tagsToUpdate,
  }: UseMutationInputs) {
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState<Sighting | SightingInStorage | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<Error | null>(null);
    const [pending, setPending] = useState(false);

    const { signOut } = useAuth();
    const router = useRouter();

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

          const result: ApiResponse<Sighting> = await response.json();

          if (result.error) {
            if (result.statusCode === 401) {
              toast.error(ErrorMessages.InvalidSession);
              signOut();
              deleteSessionCookie();
              router.replace("/signin");
            }
            return setError(result.message);
          }

          setData(result.data);
          setSuccess(true);
        } catch (error) {
          console.error(error);
          if (error instanceof Error) {
            setFetchError(error);
          } else {
            setError(ErrorMessages.ServerOutage);
          }
        } finally {
          setPending(false);
        }
      } else {
        const result: SightingInStorage = mutateStorage(
          tag,
          method,
          formValues as CreateSightingDto,
          route,
        );
        setData(result);
        setSuccess(true);
      }

      // For each tag, call query() attached to same property in `cache`.
      tagsToUpdate.forEach((tag) => cache[tag].forEach((query) => query()));
    }

    if (fetchError) throw fetchError;

    return { success, data, error, pending, mutate };
  }

  const value: Api = {
    useQuery,
    useMutation,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw new Error(ErrorMessages.InvalidContext);
  return context;
}
