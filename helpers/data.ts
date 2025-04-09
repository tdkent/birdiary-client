// Sorting and filtering functions
import { DateTime } from "luxon";
import type { FetchedSighting, SortValues } from "@/types/models";

export function sortSightings(
  sightings: FetchedSighting[],
  option: SortValues,
) {
  switch (option) {
    // A - Z
    case "alphaAsc":
      return sightings.sort((a, b) => {
        if (a.commName < b.commName) return -1;
        if (a.commName > b.commName) return 1;
        return 0;
      });
    // Z - A
    case "alphaDesc":
      return sightings.sort((a, b) => {
        if (a.commName > b.commName) return -1;
        if (a.commName < b.commName) return 1;
        return 0;
      });
    // Oldest - Newest
    case "dateAsc":
      return sightings.sort((a, b) => {
        const dateA = DateTime.fromISO(a.date).toMillis();
        const dateB = DateTime.fromISO(b.date).toMillis();
        return dateA - dateB;
      });
    // Newest - Oldest
    case "dateDesc":
      return sightings.sort((a, b) => {
        const dateA = DateTime.fromISO(a.date).toMillis();
        const dateB = DateTime.fromISO(b.date).toMillis();
        return dateB - dateA;
      });
    default:
      return sightings;
  }
}
