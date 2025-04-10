// Functions to process data in local storage
import { v4 as uuidv4 } from "uuid";
import type { MutationParameters } from "@/types/api";
import type {
  StorageSighting,
  NewSighting,
  Diary,
  FetchedSighting,
} from "@/types/models";
import { apiRoutes } from "@/types/api";
import { sortSightings } from "@/helpers/data";

// ======= QUERY =======

// Query and filter data in storage based on provided route
export function queryStorage(route: string, key: string) {
  // Add default empty array to storage
  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, "[]");
  }
  // Fetch data from local storage based on `key` parameter
  const data = JSON.parse(window.localStorage.getItem(key)!);

  switch (true) {
    // Home ("/")
    // Recent sightings: sort by date (desc), limit 10
    case route === apiRoutes.recentSightings:
      return sortSightings(data as FetchedSighting[], "dateDesc").slice(0, 10);

    // Diary ("/diary")
    // Sort by date (desc)
    case route === apiRoutes.groupedSightings("date"):
      return sortSightings(data as Diary[], "dateDesc");

    // Diary Details ("/diary/:date")
    // Filter by date parameter in route string
    case route.startsWith("/sightings/date/"): {
      const date = route.slice(-10);
      const sightings = data as FetchedSighting[];
      return sightings.filter(
        (sighting) => sighting.date.slice(0, 10) === date,
      );
    }

    // Bird Details ("/birds/:name")
    // Filter by name parameter in route string
    case route.startsWith("/sightings/bird/"): {
      const name = route.split("/")[3];
      const sightings = data as FetchedSighting[];
      return sightings.filter((sighting) => sighting.commName === name);
    }
  }
}

// ======= MUTATE =======

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
  formValues: MutationDataMap[K]["formValues"],
) {
  // Check if local storage contains the provided key
  // If the key does not exist, initialize with an empty array
  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, "[]");
  }

  // Fetch data from local storage based on `key` parameter
  const data: MutationDataMap[K]["data"] = JSON.parse(
    window.localStorage.getItem(key)!,
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
      entry.date === date ? { ...entry, count: ++entry.count } : entry,
    );
    window.localStorage.setItem("diary", JSON.stringify(updateDiary));
  } else {
    const diaryEntry: Diary = { date, count: 1 };
    diary.push(diaryEntry);
    window.localStorage.setItem("diary", JSON.stringify(diary));
  }
}
