// Functions to process data in local storage
import { v4 as uuidv4 } from "uuid";
import type { MutationParameters } from "@/types/api";
import type {
  NewSightingFormValues,
  Sighting,
  GroupedData,
  SortValues,
} from "@/types/models";
import { apiRoutes, type QueryParameters } from "@/types/api";
import { sortSightings } from "@/helpers/data";
import { RESULTS_PER_PAGE } from "@/constants/constants";

// ======= QUERY =======

/** Query and filter data in storage based on provided route */
export function queryStorage(route: string, key: QueryParameters["tag"]) {
  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, "[]");
  }
  const data = JSON.parse(window.localStorage.getItem(key)!);

  switch (true) {
    // Home ("/"): Recent sightings: sort by date (desc)
    case route === apiRoutes.usersSightings:
      return sortSightings(data as Sighting[], "dateDesc").slice(
        0,
        RESULTS_PER_PAGE,
      );

    // Diary ("/diary"): sort by selected option
    case route.startsWith("/sightings?groupBy=date"):
      const query = route.split("&");
      const page = query[1].slice(5);
      const sortBy = query[2].slice(7);
      return sortSightings(data as GroupedData[], sortBy as SortValues);

    // Diary Details ("/diary/:date"): filter by date parameter in route string
    case route.startsWith("/sightings/date/"): {
      const date = route.slice(-10);
      const sightings = data as Sighting[];
      return sightings.filter(
        (sighting) => sighting.date.slice(0, 10) === date,
      );
    }

    // Bird Details ("/birds/:name"): filter by name parameter in route string
    case route.startsWith("/sightings/bird/"): {
      const name = route.split("/")[3];
      const sightings = data as Sighting[];
      return sightings.filter((sighting) => sighting.commName === name);
    }

    default:
      throw new Error("Invalid request");
  }
}

// ======= MUTATE =======

export function mutateStorage(
  tag: "sightings",
  method: MutationParameters["method"],
  formValues: NewSightingFormValues,
) {
  if (!window.localStorage.getItem(tag)) {
    window.localStorage.setItem(tag, "[]");
  }

  const data = JSON.parse(window.localStorage.getItem(tag)!);

  switch (method) {
    case "POST": {
      if (tag === "sightings") {
        addSighting(data, formValues as NewSightingFormValues);
        break;
      }
    }

    default:
      throw new Error("Invalid request method");
  }
}

// Note about `date`: dates are sent TO the server as a Date
// `date` is returned FROM the server as a string

function addSighting(data: Sighting[], formValues: NewSightingFormValues) {
  data.push({
    ...formValues,
    sightingId: uuidv4(),
    id: data.length ? data[data.length - 1].id + 1 : 1,
    userId: "",
    locationId: null,
  });
  window.localStorage.setItem("sightings", JSON.stringify(data));
  updateDiary(formValues.date);
}

function updateDiary(date: string) {
  if (!window.localStorage.getItem("diary")) {
    window.localStorage.setItem("diary", "[]");
  }

  const diary: GroupedData[] = JSON.parse(
    window.localStorage.getItem("diary")!,
  );

  const entryExists = diary.find((entry) => entry.text === date);
  if (entryExists) {
    const updateDiary = diary.map((entry) =>
      entry.text === date ? { ...entry, count: ++entry.count } : entry,
    );
    window.localStorage.setItem("diary", JSON.stringify(updateDiary));
  } else {
    const convertDateToInteger = Number(date.slice(0, 10).replaceAll("-", ""));
    const diaryEntry: GroupedData = {
      id: convertDateToInteger,
      text: date,
      count: 1,
    };
    diary.push(diaryEntry);
    window.localStorage.setItem("diary", JSON.stringify(diary));
  }
}
