"use client";

import { serverApiRequest } from "@/actions/api.actions";
import { deleteSessionCookie } from "@/actions/auth.actions";
import { useAuth } from "@/context/AuthContext";
import { getCookie } from "@/helpers/auth.helpers";
import { mutateStorage, queryStorage } from "@/helpers/storage.helpers";
import {
  Api,
  ApiContext,
  type UseMutationInputs,
  type UseQueryInputs,
} from "@/types/api-context.types";
import type { ApiResponse } from "@/types/api.types";
import { ErrorMessages } from "@/types/error-messages.enum";
import type {
  NewSighting,
  Sighting,
  StorageDiary,
  StorageSighting,
} from "@/types/sighting.types";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /** Fetch from server or browser in client components. */
  function useQuery({ route, tags }: UseQueryInputs) {
    const [data, setData] = useState<unknown>();
    const [count, setCount] = useState<number>(-1);
    const [error, setError] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<Error | null>(null);
    const [pending, setPending] = useState(false);

    const { isSignedIn, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
      async function query() {
        setError(null);
        const token = await getCookie();
        if (token) {
          setPending(true);
          try {
            const result: ApiResponse<unknown> = await serverApiRequest({
              route,
              tags,
            });

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
            if (error instanceof Error) {
              Sentry.logger.error(error.message);
              setFetchError(error);
            } else {
              Sentry.logger.error(ErrorMessages.ServerOutage);
              setError(ErrorMessages.ServerOutage);
            }
          } finally {
            setPending(false);
          }
        } else {
          const data = queryStorage(route);
          if ("items" in data) {
            setData((data.items as StorageSighting[] | StorageDiary[]) || []);
            setCount(data.countOfRecords);
          } else {
            setData(data);
          }
        }
      }
      query();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignedIn, route, router, signOut]);

    if (fetchError) throw fetchError;

    return { count, data, error, pending };
  }

  /** Mutations on server or browser in client components. */
  function useMutation({ route, method }: UseMutationInputs) {
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState<Sighting | StorageSighting | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<Error | null>(null);
    const [pending, setPending] = useState(false);

    const { signOut } = useAuth();
    const router = useRouter();

    async function mutate(formValues: object) {
      setSuccess(false);
      const token = await getCookie();
      if (token) {
        setError(null);
        setPending(true);
        try {
          const result: ApiResponse<Sighting> = await serverApiRequest({
            method,
            revalidateTags: ["location", "sighting", "user"],
            requestBody: formValues,
            route,
          });

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
          if (error instanceof Error) {
            Sentry.logger.error(error.message);
            setFetchError(error);
          } else {
            Sentry.logger.error(ErrorMessages.ServerOutage);
            setError(ErrorMessages.ServerOutage);
          }
        } finally {
          setPending(false);
        }
      } else {
        const result: StorageSighting = mutateStorage(
          method,
          formValues as NewSighting,
          route,
        );
        setData(result);
        setSuccess(true);
      }
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
