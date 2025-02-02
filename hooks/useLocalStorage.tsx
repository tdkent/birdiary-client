import type { Sighting } from "@/actions/sightings";

// `formValues` is a generic type <T>
// The type of <T> must be explicity declared when the function is called
export type LocalStorageRequest<T> = {
  formValues: T;
  method: "POST" | "GET" | "PATCH" | "DELETE";
  key: "sightings";
};

export default function useLocalStorage() {
  function sendReqToLocalStorage<T>({
    formValues,
    method,
    key,
  }: LocalStorageRequest<T>) {
    // Check if local storage contains the provided key
    // If the key does not exist, initialize with an empty array
    // Note: local storage data must be stringified
    if (!window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, "[]");
    }

    // Fetch data from local storage based on `key` parameter
    const data: T[] = JSON.parse(window.localStorage.getItem(key)!);

    // Update the data based on HTTP `method` parameter
    if (method === "POST") {
      data.push(formValues);
    }

    // Set the updated data in local storage
    localStorage.setItem(key, JSON.stringify(data));
  }

  return { sendReqToLocalStorage };
}
