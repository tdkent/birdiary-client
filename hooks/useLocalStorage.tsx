import type { Sighting } from "@/actions/sightings";

export default function useLocalStorage() {
  function sendReqToLocalStorage(
    formData: Sighting,
    method: string,
    key: string
  ) {
    console.log(method);
    // Check if local storage contains the provided key
    // If the key does not exist, initialize with an empty array
    // Note: local storage data must be stringified
    if (!window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, "[]");
    }

    // Fetch the data from local storage
    // Add the new sighting (note: make this generic later) to the array and set in storage
    //? Type of 'data' should be a generic?
    //? this should be parsed?
    const data: Sighting[] = JSON.parse(window.localStorage.getItem(key)!);
    data.push(formData);

    localStorage.setItem(key, JSON.stringify(data));
  }

  return { sendReqToLocalStorage };
}
