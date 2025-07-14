// Sorting and filtering functions
import { DateTime } from "luxon";
import type { Group, SightingInStorage } from "@/models/display";
import type { SortValues } from "@/models/form";

export function sortSightings(
  arr: SightingInStorage[] | Group[],
  option: SortValues,
) {
  switch (option) {
    // A - Z
    case "alphaAsc": {
      const sightings = arr as SightingInStorage[];
      return sightings.sort((a, b) => {
        if (a.bird.commonName < b.bird.commonName) return -1;
        if (a.bird.commonName > b.bird.commonName) return 1;
        return 0;
      });
    }

    // Z - A
    case "alphaDesc": {
      const sightings = arr as SightingInStorage[];
      return sightings.sort((a, b) => {
        if (a.bird.commonName > b.bird.commonName) return -1;
        if (a.bird.commonName < b.bird.commonName) return 1;
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
          const diaryA = a as Group;
          const diaryB = b as Group;
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
          const diaryA = a as Group;
          const diaryB = b as Group;
          const dateA = DateTime.fromISO(diaryA.text).toMillis();
          const dateB = DateTime.fromISO(diaryB.text).toMillis();
          return dateB - dateA;
        }
      });

    // Most Sightings
    case "count": {
      const Group = arr as Group[];
      return Group.sort((a, b) => {
        const dateA = DateTime.fromISO(a.text).toMillis();
        const dateB = DateTime.fromISO(b.text).toMillis();
        return b.count - a.count || dateB - dateA;
      });
    }

    default:
      return arr;
  }
}
