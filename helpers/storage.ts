// Functions to process data in local storage
import type { MutationParameters } from "@/models/api";
import type { CreateSightingDto, SortValues } from "@/models/form";
import type { Group, SightingInStorage } from "@/models/display";
import type { QueryParameters } from "@/models/api";
import { sortSightings } from "@/helpers/data";
import { convertSightingDateToInteger } from "@/helpers/dates";
import { RESULTS_PER_PAGE } from "@/constants/constants";
import birdNames from "@/data/birds";

type QueryStorageData = {
  items: SightingInStorage[] | Group[];
  countOfRecords: number;
};

/** Query, filter, and sort data in storage based on route */
export function queryStorage(
  route: string,
  key: QueryParameters["tag"],
): QueryStorageData {
  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, "[]");
  }
  const data = JSON.parse(window.localStorage.getItem(key)!);
  switch (true) {
    // Diary ("/diary"): sort by selected option
    case route.includes("/sightings?groupBy=date"): {
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
    case route.includes("/sightings?dateId="): {
      const date = route.split("dateId=")[1].slice(0, 10);
      const query = route.split("&");
      const page = Number(query[1].slice(5));
      const sortBy = query[2].slice(7);
      const sightings = data as SightingInStorage[];
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
    case route.includes("/sightings?birdId="): {
      const queries = route.split("?")[1].split("&");
      const birdId = Number(queries[0].slice(7));
      const page = Number(queries[1].slice(5));
      const sortBy = queries[2].slice(7);
      const sightings = data as SightingInStorage[];
      const filterByBird = sightings.filter(
        (sighting) => sighting.birdId === birdId,
      );
      const sorted = sortSightings(filterByBird, sortBy as SortValues);
      const paginated = sorted.slice(
        RESULTS_PER_PAGE * (page - 1),
        RESULTS_PER_PAGE * page,
      );
      return { items: paginated, countOfRecords: filterByBird.length };
    }

    // Sightings ("/sightings"): all sightings, sort by date or bird name
    case route.split("api")[1].startsWith("/sightings"): {
      const queries = route.split("?")[1].split("&");
      const page = Number(queries[0].slice(5));
      const sortBy = queries[1].slice(7);
      const sorted = sortSightings(
        data as SightingInStorage[],
        sortBy as SortValues,
      );
      const paginated = sorted.slice(
        RESULTS_PER_PAGE * (page - 1),
        RESULTS_PER_PAGE * page,
      );
      return { items: paginated, countOfRecords: data.length };
    }

    default:
      throw new Error("Invalid request");
  }
}

/** Mutate sighting data in storage based on method */
export function mutateStorage(
  tag: "sightings" | "locations",
  method: MutationParameters["method"],
  formValues: CreateSightingDto,
  route: string,
) {
  switch (method) {
    case "POST": {
      addSighting(formValues);
      break;
    }
    case "PATCH": {
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

// Note: dates are sent to server as Date, returned from server as string.

function addSighting(formValues: CreateSightingDto) {
  if (!window.localStorage.getItem("sightings")) {
    window.localStorage.setItem("sightings", "[]");
  }
  const sightings: SightingInStorage[] = JSON.parse(
    window.localStorage.getItem("sightings")!,
  );

  sightings.push({
    ...formValues,
    id: sightings.length ? sightings[sightings.length - 1].id + 1 : 1,
    bird: { commonName: birdNames[formValues.birdId - 1] },
  });
  window.localStorage.setItem("sightings", JSON.stringify(sightings));
  addToDiary(formValues.date);
}

function editSighting(formValues: CreateSightingDto, route: string) {
  const id = Number(route.split("/")[route.split("/").length - 1]);
  const sightings: SightingInStorage[] = JSON.parse(
    window.localStorage.getItem("sightings")!,
  );
  let sightingDate: string = "";
  const updateSighting = sightings.map((sighting) => {
    if (sighting.id === id) {
      sightingDate = sighting.date;
      return {
        ...sighting,
        ...formValues,
        bird: { commonName: birdNames[formValues.birdId - 1] },
      };
    }
    return sighting;
  });
  window.localStorage.setItem("sightings", JSON.stringify(updateSighting));
  if (formValues.date === sightingDate) return;
  addToDiary(formValues.date);
  removeFromDiary(sightingDate);
}

function deleteSighting(route: string) {
  const id = Number(route.split("/")[route.split("/").length - 1]);
  const sightings: SightingInStorage[] = JSON.parse(
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
