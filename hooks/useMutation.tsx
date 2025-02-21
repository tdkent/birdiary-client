import { useEffect, useState } from "react";
import { ErrorMessages, NestResError } from "@/types/error";
import { checkSession, getCookie } from "@/helpers/auth";

type MutationParameters<T> = {
  key: "sightings";
  route: string;
  method: "POST";
  formValues: T;
};

export default function useMutation() {
  async function mutateData<T>({
    key,
    route,
    method,
    formValues,
  }: MutationParameters<T>) {
    const isLoggedIn = await checkSession();

    // Send request to server if logged in
    if (isLoggedIn) {
      try {
        const token = await getCookie();
        const response = await fetch(route, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formValues),
        });

        return response.json();
      } catch {
        // Unexpected errors bubble to nearest error boundary
        throw new Error(ErrorMessages.Default);
      }
    }

    // Send request to storage if not logged in

    // Check if local storage contains the provided key
    // If the key does not exist, initialize with an empty array
    if (!window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, "[]");
    }

    // Fetch data from local storage based on `key` parameter
    const data: T[] = JSON.parse(window.localStorage.getItem(key)!);

    // Update the data based on HTTP `method` parameter

    if (method === "POST") {
      // create uuid
    }
    // Set the updated data in local storage
    // localStorage.setItem(key, JSON.stringify(data));
  }

  return { mutateData };
}
