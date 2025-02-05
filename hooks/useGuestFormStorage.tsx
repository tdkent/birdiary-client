import type { FormAction } from "@/hooks/useFormRouter";

// Omit "route" property from FormAction type
type LocalStorageRequest<T> = Omit<FormAction<T>, "route">;

export default function useGuestFormStorage() {
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
