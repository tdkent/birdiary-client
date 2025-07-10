// Sorting and filtering functions
import { DateTime } from "luxon";
import type { GroupedData, SortValues, Sighting } from "@/models/models";

export function sortSightings(
  arr: Sighting[] | GroupedData[],
  option: SortValues,
) {
  switch (option) {
    // A - Z
    case "alphaAsc": {
      const sightings = arr as Sighting[];
      return sightings.sort((a, b) => {
        if (a.commName < b.commName) return -1;
        if (a.commName > b.commName) return 1;
        return 0;
      });
    }

    // Z - A
    case "alphaDesc": {
      const sightings = arr as Sighting[];
      return sightings.sort((a, b) => {
        if (a.commName > b.commName) return -1;
        if (a.commName < b.commName) return 1;
        return 0;
      });
    }

    // Oldest - Newest
    case "dateAsc":
      return arr.sort((a, b) => {
        if ("date" in a && "date" in b) {
          const dateA = DateTime.fromISO(a.date).toMillis();
          const dateB = DateTime.fromISO(b.date).toMillis();
          return dateA - dateB;
        } else {
          const diaryA = a as GroupedData;
          const diaryB = b as GroupedData;
          const dateA = DateTime.fromISO(diaryA.text).toMillis();
          const dateB = DateTime.fromISO(diaryB.text).toMillis();
          return dateA - dateB;
        }
      });

    // Newest - Oldest
    case "dateDesc":
      return arr.sort((a, b) => {
        if ("date" in a && "date" in b) {
          const dateA = DateTime.fromISO(a.date).toMillis();
          const dateB = DateTime.fromISO(b.date).toMillis();
          return dateB - dateA;
        } else {
          const diaryA = a as GroupedData;
          const diaryB = b as GroupedData;
          const dateA = DateTime.fromISO(diaryA.text).toMillis();
          const dateB = DateTime.fromISO(diaryB.text).toMillis();
          return dateB - dateA;
        }
      });

    // Most Sightings
    case "count": {
      const groupedData = arr as GroupedData[];
      return groupedData.sort((a, b) => {
        const dateA = DateTime.fromISO(a.text).toMillis();
        const dateB = DateTime.fromISO(b.text).toMillis();
        return b.count - a.count || dateB - dateA;
      });
    }

    default:
      return arr;
  }
}
