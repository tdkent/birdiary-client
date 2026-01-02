import { PAGINATE } from "@/constants/app.constants";
import birdNames from "@/db/birdNames";
import { sortSightings } from "@/helpers/app.helpers";
import { convertSightingDateToInteger } from "@/helpers/date.helpers";
import type { UseMutationInputs } from "@/types/api-context.types";
import type { SortValues } from "@/types/list-sort.types";
import type {
  NewSighting,
  StorageDiary,
  StorageSighting,
} from "@/types/sighting.types";

type QueryStorageData =
  | {
      items: StorageSighting[] | StorageDiary[];
      countOfRecords: number;
    }
  | StorageSighting;

/** Query, filter, and sort data in storage based on route */
export function queryStorage(route: string): QueryStorageData {
  if (!window.localStorage.getItem("sightings"))
    window.localStorage.setItem("sightings", "[]");
  if (!window.localStorage.getItem("diary"))
    window.localStorage.setItem("diary", "[]");

  const storageSightings: StorageSighting[] = JSON.parse(
    window.localStorage.getItem("sightings")!,
  );
  const storageDiary: StorageDiary[] = JSON.parse(
    window.localStorage.getItem("diary")!,
  );

  const sightingDetailsPattern = /^\/sightings\/\d+/;

  switch (true) {
    // Diary ("/diary"): sort by selected option
    case route.includes("groupBy=date"): {
      const query = route.split("&");
      const page = Number(query[1].slice(5));
      const sortBy = query[2].slice(7);
      const sightings = sortSightings(storageDiary, sortBy as SortValues);
      const paginated = sightings.slice(
        PAGINATE.LARGE_LIST * (page - 1),
        PAGINATE.LARGE_LIST * page,
      );
      return { items: paginated, countOfRecords: sightings.length };
    }

    // Diary Details ("/diary/:date"): filter by date parameter in route string
    case route.includes("dateId="): {
      const date = route.split("dateId=")[1].slice(0, 10);
      const query = route.split("&");
      const page = Number(query[1].slice(5));
      const sortBy = query[2].slice(7);
      // const sightings = data as StorageSighting[];
      const filterByDate = storageSightings.filter(
        (sighting) => sighting.date.slice(0, 10) === date,
      );
      const sorted = sortSightings(filterByDate, sortBy as SortValues);
      const paginated = sorted.slice(
        PAGINATE.SMALL_LIST * (page - 1),
        PAGINATE.SMALL_LIST * page,
      );
      return { items: paginated, countOfRecords: filterByDate.length };
    }

    // Bird Details ("/birds/:id/sightings"): filter by name parameter in route string
    case route.startsWith("/birds"): {
      const birdId = Number(route.split("/")[2]);
      const queries = route.split("?")[1].split("&");
      const page = Number(queries[0].slice(5));
      const sortBy = queries[1].slice(7);
      const filterByBird = storageSightings.filter(
        (sighting) => sighting.birdId === birdId,
      );
      const sorted = sortSightings(filterByBird, sortBy as SortValues);
      const paginated = sorted.slice(
        PAGINATE.SMALL_LIST * (page - 1),
        PAGINATE.SMALL_LIST * page,
      );
      return { items: paginated, countOfRecords: filterByBird.length };
    }

    // Sighting Details ("/sightings/:id")
    case sightingDetailsPattern.test(route): {
      const sightingId = Number(route.split("/")[2]);
      const sighting = storageSightings.filter((s) => s.id === sightingId)[0];
      return sighting;
    }

    // Sightings ("/sightings"): all sightings, sort by date or bird name
    case route.startsWith("/sightings"): {
      const queries = route.split("?")[1].split("&");
      const page = Number(queries[0].slice(5));
      const sortBy = queries[1].slice(7);
      const sorted = sortSightings(storageSightings, sortBy as SortValues);
      const paginated = sorted.slice(
        PAGINATE.LARGE_LIST * (page - 1),
        PAGINATE.LARGE_LIST * page,
      );
      return { items: paginated, countOfRecords: storageSightings.length };
    }

    default:
      throw new Error("Invalid request");
  }
}

/** Mutate sighting data in storage based on method */
export function mutateStorage(
  method: UseMutationInputs["method"],
  formValues: NewSighting,
  route: string,
) {
  switch (method) {
    case "POST": {
      return addSighting(formValues);
    }
    case "PATCH": {
      return editSighting(formValues, route);
    }
    case "DELETE": {
      return deleteSighting(route);
    }
    default:
      throw new Error("Invalid request method");
  }
}

function addSighting(formValues: NewSighting) {
  if (!window.localStorage.getItem("sightings")) {
    window.localStorage.setItem("sightings", "[]");
  }
  const sightings: StorageSighting[] = JSON.parse(
    window.localStorage.getItem("sightings")!,
  );

  const dateWithTimeStamp = formValues.date + "T00:00:00.000Z";

  const sighting = {
    ...formValues,
    id: sightings.length ? sightings[sightings.length - 1].id + 1 : 1,
    bird: { commonName: birdNames[formValues.birdId - 1] },
    date: dateWithTimeStamp,
  };
  sightings.push(sighting);
  window.localStorage.setItem("sightings", JSON.stringify(sightings));
  addToDiary(dateWithTimeStamp);
  return sighting;
}

function editSighting(formValues: NewSighting, route: string) {
  const id = Number(route.split("/")[route.split("/").length - 1]);
  const sightings: StorageSighting[] = JSON.parse(
    window.localStorage.getItem("sightings")!,
  );
  let sightingDate = "";
  const formDateWithTimeStamp = formValues.date + "T00:00:00.000Z";
  const updateSighting = sightings.map((sighting) => {
    if (sighting.id === id) {
      sightingDate = sighting.date;
      return {
        ...sighting,
        ...formValues,
        bird: { commonName: birdNames[formValues.birdId - 1] },
        date: formDateWithTimeStamp,
      };
    }
    return sighting;
  });
  window.localStorage.setItem("sightings", JSON.stringify(updateSighting));
  const updatedSighting = updateSighting.find((s) => s.id === id)!;
  if (formDateWithTimeStamp === sightingDate) return updatedSighting;
  addToDiary(formDateWithTimeStamp);
  removeFromDiary(sightingDate);
  return updatedSighting;
}

function deleteSighting(route: string) {
  const id = Number(route.split("/")[route.split("/").length - 1]);
  const sightings: StorageSighting[] = JSON.parse(
    window.localStorage.getItem("sightings")!,
  );
  const deletedSighting = sightings.find((sighting) => sighting.id === id)!;
  const deleteSighting = sightings.filter((sighting) => sighting.id !== id);
  window.localStorage.setItem("sightings", JSON.stringify(deleteSighting));
  removeFromDiary(deletedSighting.date);
  return deletedSighting;
}

function addToDiary(date: string) {
  if (!window.localStorage.getItem("diary")) {
    window.localStorage.setItem("diary", "[]");
  }

  const diary: StorageDiary[] = JSON.parse(
    window.localStorage.getItem("diary")!,
  );

  const entryExists = diary.find((entry) => entry.date === date);
  if (entryExists) {
    const updateDiary = diary.map((entry) =>
      entry.date === date ? { ...entry, count: ++entry.count } : entry,
    );
    window.localStorage.setItem("diary", JSON.stringify(updateDiary));
  } else {
    const id = convertSightingDateToInteger(date);
    const diaryEntry: StorageDiary = {
      id,
      date,
      count: 1,
    };
    diary.push(diaryEntry);
    window.localStorage.setItem("diary", JSON.stringify(diary));
  }
}

function removeFromDiary(date: string) {
  const diary: StorageDiary[] = JSON.parse(
    window.localStorage.getItem("diary")!,
  );
  const updateDiary = diary
    .map((entry) => {
      if (entry.date === date) {
        return { ...entry, count: --entry.count };
      }
      return entry;
    })
    .filter((entry) => entry.count > 0);
  window.localStorage.setItem("diary", JSON.stringify(updateDiary));
}
