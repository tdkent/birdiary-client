import { BIRD } from "@/constants/app.constants";
import type { SortValues } from "@/types/list-sort.types";
import type { StorageDiary, StorageSighting } from "@/types/sighting.types";
import { DateTime } from "luxon";

/** Sort and filter storage data */
export function sortSightings(
  arr: StorageSighting[] | StorageDiary[],
  option: SortValues,
) {
  switch (option) {
    case "alphaAsc": {
      const sightings = arr as StorageSighting[];
      return sightings.sort((a, b) => {
        if (a.bird.commonName < b.bird.commonName) return -1;
        if (a.bird.commonName > b.bird.commonName) return 1;
        return 0;
      });
    }
    case "alphaDesc": {
      const sightings = arr as StorageSighting[];
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
          const diaryA = a as StorageDiary;
          const diaryB = b as StorageDiary;
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
          const diaryA = a as StorageDiary;
          const diaryB = b as StorageDiary;
          const dateA = DateTime.fromISO(diaryA.date).toMillis();
          const dateB = DateTime.fromISO(diaryB.date).toMillis();
          return dateB - dateA;
        }
      });
    case "count": {
      const group = arr as StorageDiary[];
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

/** Check if string parses to a valid integer.  */
export function checkValidParamInteger(id: string, isBirdId?: boolean) {
  const parsedId = Number(id);
  if (!parsedId || parsedId < 1 || (isBirdId && parsedId > BIRD.BIRD_COUNT))
    return null;
  return parsedId;
}
