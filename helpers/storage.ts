// Functions to process data in local storage
import { v4 as uuidv4 } from "uuid";
import type { MutationParameters } from "@/models/api";
import type { NewSighting, SortValues } from "@/models/form";
import type { Sighting } from "@/models/db";
import type { Group } from "@/models/display";
import { apiRoutes, type QueryParameters } from "@/models/api";
import { sortSightings } from "@/helpers/data";
import { convertSightingDateToInteger } from "@/helpers/dates";
import { RESULTS_PER_PAGE } from "@/constants/constants";

// ======= QUERY =======

type QueryStorageData = {
  items: Sighting[] | Group[];
  countOfRecords: number;
};

/** Query and filter data in storage based on provided route */
export function queryStorage(
  route: string,
  key: QueryParameters["tag"],
): QueryStorageData {
  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, "[]");
  }
  const data = JSON.parse(window.localStorage.getItem(key)!);

  switch (true) {
    // Home ("/"): Recent sightings: sort by date (desc)
    case route === apiRoutes.usersSightings: {
      const sightings = sortSightings(data as Sighting[], "dateDesc").slice(
        0,
        RESULTS_PER_PAGE,
      );
      return { items: sightings, countOfRecords: sightings.length };
    }

    // Diary ("/diary"): sort by selected option
    case route.startsWith("/sightings?groupBy=date"): {
      const query = route.split("&");
      const page = Number(query[1].slice(5));
      const sortBy = query[2].slice(7);
      const sightings = sortSightings(data as Group[], sortBy as SortValues);
      const paginated = sightings.slice(
        RESULTS_PER_PAGE * (page - 1),
        RESULTS_PER_PAGE * page,
      );
      return { items: paginated, countOfRecords: sightings.length };
    }

    // Diary Details ("/diary/:date"): filter by date parameter in route string
    case route.startsWith("/sightings/date/"): {
      const date = route.split("?")[0].slice(-10);
      const query = route.split("&");
      const page = Number(query[0].split("?")[1].slice(5));
      const sortBy = query[1].slice(7);
      const sightings = data as Sighting[];
      const filterByDate = sightings.filter(
        (sighting) => sighting.date.slice(0, 10) === date,
      );
      const sorted = sortSightings(filterByDate, sortBy as SortValues);
      const paginated = sorted.slice(
        RESULTS_PER_PAGE * (page - 1),
        RESULTS_PER_PAGE * page,
      );
      return { items: paginated, countOfRecords: filterByDate.length };
    }

    // Bird Details ("/birds/:name"): filter by name parameter in route string
    case route.startsWith("/sightings/bird/"): {
      const queries = route.split("?");
      const name = queries[0].split("/")[3];
      const page = Number(queries[1].split("&")[0].slice(5));
      const sortBy = queries[1].split("&")[1].slice(7);
      const sightings = data as Sighting[];
      const filterByBird = sightings.filter(
        (sighting) => sighting.commName === name,
      );
      const sorted = sortSightings(filterByBird, sortBy as SortValues);
      const paginated = sorted.slice(
        RESULTS_PER_PAGE * (page - 1),
        RESULTS_PER_PAGE * page,
      );
      return { items: paginated, countOfRecords: filterByBird.length };
    }

    default:
      throw new Error("Invalid request");
  }
}

// ======= MUTATE =======

export function mutateStorage(
  tag: "sightings" | "locations",
  method: MutationParameters["method"],
  formValues: NewSighting,
  route: string,
) {
  switch (method) {
    case "POST": {
      addSighting(formValues);
      break;
    }
    case "PUT": {
      editSighting(formValues, route);
      break;
    }
    case "DELETE": {
      deleteSighting(route);
      break;
    }
    default:
      throw new Error("Invalid request method");
  }
}

// Note about `date`: dates are sent TO the server as a Date
// `date` is returned FROM the server as a string

function addSighting(formValues: NewSighting) {
  if (!window.localStorage.getItem("sightings")) {
    window.localStorage.setItem("sightings", "[]");
  }
  const sightings: Sighting[] = JSON.parse(
    window.localStorage.getItem("sightings")!,
  );
  sightings.push({
    ...formValues,
    sightingId: uuidv4(),
    id: sightings.length ? sightings[sightings.length - 1].id + 1 : 1,
    userId: "",
    locationId: null,
  });
  window.localStorage.setItem("sightings", JSON.stringify(sightings));
  addToDiary(formValues.date);
}

function editSighting(formValues: NewSighting, route: string) {
  const id = parseInt(route.split("/")[2]);
  const sightings: Sighting[] = JSON.parse(
    window.localStorage.getItem("sightings")!,
  );
  let sightingDate: string = "";
  const updateSighting = sightings.map((sighting) => {
    if (sighting.id === id) {
      sightingDate = sighting.date;
      return { ...sighting, ...formValues };
    }
    return sighting;
  });
  window.localStorage.setItem("sightings", JSON.stringify(updateSighting));

  if (formValues.date === sightingDate) return;

  addToDiary(formValues.date);
  removeFromDiary(sightingDate);
}

function deleteSighting(route: string) {
  const id = parseInt(route.split("/")[2]);
  const sightings: Sighting[] = JSON.parse(
    window.localStorage.getItem("sightings")!,
  );
  const { date } = sightings.find((sighting) => sighting.id === id)!;
  const deleteSighting = sightings.filter((sighting) => sighting.id !== id);
  window.localStorage.setItem("sightings", JSON.stringify(deleteSighting));
  removeFromDiary(date);
}

function addToDiary(date: string) {
  if (!window.localStorage.getItem("diary")) {
    window.localStorage.setItem("diary", "[]");
  }

  const diary: Group[] = JSON.parse(window.localStorage.getItem("diary")!);

  const entryExists = diary.find((entry) => entry.text === date);
  if (entryExists) {
    const updateDiary = diary.map((entry) =>
      entry.text === date ? { ...entry, count: ++entry.count } : entry,
    );
    window.localStorage.setItem("diary", JSON.stringify(updateDiary));
  } else {
    const id = convertSightingDateToInteger(date);
    const diaryEntry: Group = {
      id,
      text: date,
      count: 1,
    };
    diary.push(diaryEntry);
    window.localStorage.setItem("diary", JSON.stringify(diary));
  }
}

function removeFromDiary(date: string) {
  const diary: Group[] = JSON.parse(window.localStorage.getItem("diary")!);
  const updateDiary = diary
    .map((entry) => {
      if (entry.text === date) {
        return { ...entry, count: --entry.count };
      }
      return entry;
    })
    .filter((entry) => entry.count > 0);
  window.localStorage.setItem("diary", JSON.stringify(updateDiary));
}
