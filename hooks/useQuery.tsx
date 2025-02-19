// Determines user's auth status

// useEffect determines when to fetch?
// How to handle state?
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { ErrorMessages, NestResError } from "@/models/error";

type QueryParameters = {
  key: "sightings";
  route: string;
};

export default function useQuery<T>(
  key: QueryParameters["key"],
  route: QueryParameters["route"]
) {
  const { isSignedIn, token } = useContext(AuthContext);
  const [fetchedData, setFetchedData] = useState<T[]>([]);
  const [error, setError] = useState<NestResError | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      getStorageData(key);
    } else {
      getData(route);
    }

    async function getStorageData(key: QueryParameters["key"]) {
      // Add default empty array to storage
      if (!window.localStorage.getItem(key)) {
        window.localStorage.setItem(key, "[]");
      }
      // Fetch data from local storage based on `key` parameter
      const data: T[] = JSON.parse(window.localStorage.getItem(key)!);
      setFetchedData(data);
    }

    async function getData(route: QueryParameters["route"]) {
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
  }, []);

  return { fetchedData, error, isPending };
}
