import { useState } from "react";
import {
  ErrorMessages,
  type ExpectedServerError,
  type SuccessResponse,
} from "@/types/api";
import type {
  MutationParameters,
  MutateDbParameters,
  MutateStorageParameters,
} from "@/types/api";
import { checkSession, getCookie } from "@/helpers/auth";

export default function useMutation() {
  const [isPending, setIsPending] = useState(false);

  async function mutate<T>({
    key,
    route,
    method,
    formValues,
  }: MutationParameters<T>) {
    const isLoggedIn = await checkSession();
    // Send request to server if logged in
    if (isLoggedIn) {
      return mutateDb({ route, method, formValues });
    } else {
      return mutateStorage({ key, method, formValues });
    }
  }

  // Send request to the server
  async function mutateDb<T>({
    route,
    method,
    formValues,
  }: MutateDbParameters<T>) {
    try {
      setIsPending(true);
      const token = await getCookie();
      const response = await fetch(route, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });

      const data: ExpectedServerError | SuccessResponse = await response.json();
      return data;
    } catch (error) {
      // Unexpected errors bubble to nearest error boundary
      console.error(error);
      throw new Error(ErrorMessages.Default);
    } finally {
      setIsPending(false);
    }
  }

  // Send request to local storage
  // Create a uuid for each request
  async function mutateStorage<T>({
    key,
    method,
    formValues,
  }: MutateStorageParameters<T>) {
    // Check if local storage contains the provided key
    // If the key does not exist, initialize with an empty array
    if (!window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, "[]");
    }

    // Fetch data from local storage based on `key` parameter
    const data: T[] = JSON.parse(window.localStorage.getItem(key)!);

    // Update the data based on HTTP `method` parameter
    if (method === "POST") {
      // TODO: create uuid
      data.push({ id: 1, ...formValues });
    }
    // Set the updated data in local storage
    localStorage.setItem(key, JSON.stringify(data));
    return { message: "ok" } as SuccessResponse;
  }

  return { mutate, isPending };
}
