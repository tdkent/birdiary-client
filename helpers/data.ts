// Sorting and filtering functions
import { DateTime } from "luxon";
import type { Diary, FetchedSighting, SortValues } from "@/types/models";

export function sortSightings(
  arr: FetchedSighting[] | Diary[],
  option: SortValues,
) {
  switch (option) {
    // A - Z
    case "alphaAsc": {
      const sightings = arr as FetchedSighting[];
      return sightings.sort((a, b) => {
        if (a.commName < b.commName) return -1;
        if (a.commName > b.commName) return 1;
        return 0;
      });
    }

    // Z - A
    case "alphaDesc": {
      const sightings = arr as FetchedSighting[];
      return sightings.sort((a, b) => {
        if (a.commName > b.commName) return -1;
        if (a.commName < b.commName) return 1;
        return 0;
      });
    }

    // Oldest - Newest
    case "dateAsc":
      return arr.sort((a, b) => {
        const dateA = DateTime.fromISO(a.date).toMillis();
        const dateB = DateTime.fromISO(b.date).toMillis();
        return dateA - dateB;
      });

    // Newest - Oldest
    case "dateDesc":
      return arr.sort((a, b) => {
        const dateA = DateTime.fromISO(a.date).toMillis();
        const dateB = DateTime.fromISO(b.date).toMillis();
        return dateB - dateA;
      });

    default:
      return arr;
  }
}
