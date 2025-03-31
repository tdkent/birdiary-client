// Functions to process data in local storage
import { v4 as uuidv4 } from "uuid";
import type { MutationParameters } from "@/types/api";
import type { StorageSighting, NewSighting, Diary } from "@/types/models";

// Map keys to specific data and formValues types
type MutationDataMap = {
  sightings: {
    data: StorageSighting[];
    formValues: NewSighting;
  };
};

// K is the key of MutationDataMap, such as "sightings"
export function mutateStorage<K extends keyof MutationDataMap>(
  key: K,
  method: MutationParameters["method"],
  formValues: MutationDataMap[K]["formValues"]
) {
  // Check if local storage contains the provided key
  // If the key does not exist, initialize with an empty array
  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, "[]");
  }

  // Fetch data from local storage based on `key` parameter
  const data: MutationDataMap[K]["data"] = JSON.parse(
    window.localStorage.getItem(key)!
  );

  // "POST" requests
  if (method === "POST") {
    if (key === "sightings") {
      addSighting(data, formValues);
    }
  }
}

// Note about `date`: dates are sent TO the server as type Date
// `date` is returned FROM the server as a string

// Add a new sighting to "sightings" key array
// Update "diary" key array
function addSighting(data: StorageSighting[], formValues: NewSighting) {
  // Create ID, add sighting object to data array
  const sightingId = uuidv4();
  data.push({ ...formValues, sightingId });

  // Set the updated data in local storage
  window.localStorage.setItem("sightings", JSON.stringify(data));

  // Update the diary
  updateDiary(formValues.date);
}

// Group sightings by date with a count
function updateDiary(date: string) {
  // Initialize a new diary array if needed
  if (!window.localStorage.getItem("diary")) {
    window.localStorage.setItem("diary", "[]");
  }

  const diary: Diary[] = JSON.parse(window.localStorage.getItem("diary")!);

  // If the diary contains an object with the current date, increment count by 1
  // Otherwise, create a new diary entry object and initialize count at 1
  const entryExists = diary.find((entry) => entry.date === date);
  if (entryExists) {
    const updateDiary = diary.map((entry) =>
      entry.date === date ? { ...entry, count: ++entry.count } : entry
    );
    window.localStorage.setItem("diary", JSON.stringify(updateDiary));
  } else {
    const diaryEntry: Diary = { date, count: 1 };
    diary.push(diaryEntry);
    window.localStorage.setItem("diary", JSON.stringify(diary));
  }
}
