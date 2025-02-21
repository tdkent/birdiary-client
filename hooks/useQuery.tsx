import { useEffect, useState } from "react";
import { ErrorMessages, NestResError } from "@/models/error";
import { checkSession, getCookie } from "@/helpers/auth";

type QueryParameters = {
  key: "sightings";
  route: string;
};

export default function useQuery<T>(
  key: QueryParameters["key"],
  route: QueryParameters["route"]
) {
  const [fetchedData, setFetchedData] = useState<T[]>([]);
  const [error, setError] = useState<NestResError | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Fetch data on initial render
  useEffect(() => {
    const checkSessionAndFetch = async () => {
      const isLoggedIn = await checkSession();
      if (isLoggedIn) {
        const token = await getCookie();
        getData(route, token!);
      } else {
        getStorageData(key);
      }
    };

    checkSessionAndFetch();
  }, []);

  async function getStorageData(key: QueryParameters["key"]) {
    // Add default empty array to storage
    if (!window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, "[]");
    }
    // Fetch data from local storage based on `key` parameter
    const data: T[] = JSON.parse(window.localStorage.getItem(key)!);
    setFetchedData(data);
  }

  async function getData(route: QueryParameters["route"], token: string) {
    try {
      setIsPending(true);
      const response = await fetch(route, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data: T[] | NestResError = await response.json();

      if (!response.ok) {
        setError(data as NestResError);
      }

      setFetchedData(data as T[]);
      setIsPending(false);
    } catch {
      // Unexpected errors bubble to nearest error boundary
      throw new Error(ErrorMessages.Default);
    }
  }

  return { fetchedData, error, isPending };
}
