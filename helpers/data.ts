import { BIRD_COUNT } from "@/constants/constants";
import type { Group, SightingInStorage } from "@/models/display";
import type { SortValues } from "@/models/form";
import { DateTime } from "luxon";

/** Sort and filter storage data */
export function sortSightings(
  arr: SightingInStorage[] | Group[],
  option: SortValues,
) {
  switch (option) {
    case "alphaAsc": {
      const sightings = arr as SightingInStorage[];
      return sightings.sort((a, b) => {
        if (a.bird.commonName < b.bird.commonName) return -1;
        if (a.bird.commonName > b.bird.commonName) return 1;
        return 0;
      });
    }
    case "alphaDesc": {
      const sightings = arr as SightingInStorage[];
      return sightings.sort((a, b) => {
        if (a.bird.commonName > b.bird.commonName) return -1;
        if (a.bird.commonName < b.bird.commonName) return 1;
        return 0;
      });
    }
    case "dateAsc":
      return arr.sort((a, b) => {
        if ("date" in a && "date" in b) {
          const dateA = DateTime.fromISO(a.date).toMillis();
          const dateB = DateTime.fromISO(b.date).toMillis();
          return dateA - dateB;
        } else {
          const diaryA = a as Group;
          const diaryB = b as Group;
          const dateA = DateTime.fromISO(diaryA.date).toMillis();
          const dateB = DateTime.fromISO(diaryB.date).toMillis();
          return dateA - dateB;
        }
      });
    case "dateDesc":
      return arr.sort((a, b) => {
        if ("date" in a && "date" in b) {
          const dateA = DateTime.fromISO(a.date).toMillis();
          const dateB = DateTime.fromISO(b.date).toMillis();
          return dateB - dateA;
        } else {
          const diaryA = a as Group;
          const diaryB = b as Group;
          const dateA = DateTime.fromISO(diaryA.date).toMillis();
          const dateB = DateTime.fromISO(diaryB.date).toMillis();
          return dateB - dateA;
        }
      });
    case "count": {
      const group = arr as Group[];
      return group.sort((a, b) => {
        const dateA = DateTime.fromISO(a.date).toMillis();
        const dateB = DateTime.fromISO(b.date).toMillis();
        return b.count - a.count || dateB - dateA;
      });
    }
    default:
      return arr;
  }
}

/** Format bird name from standard to URL. */
export function formatBirdNameToUrl(commonName: string) {
  return commonName.replaceAll(" ", "_").replaceAll(`'`, "");
}

/** Format bird name from URL to standard. */
export function formatUrlToBirdName(urlSegment: string) {
  return urlSegment.replaceAll("_", " ");
}

/** Check if string parses to a valid integer.  */
export function checkValidParamInteger(id: string, isBirdId?: boolean) {
  const parsedId = Number(id);
  if (!parsedId || parsedId < 1 || (isBirdId && parsedId > BIRD_COUNT))
    return null;
  return parsedId;
}
