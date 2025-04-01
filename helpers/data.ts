// Sorting and filtering functions
import { DateTime } from "luxon";
import type { Diary, DiaryDetails, DiarySortOptions } from "@/types/models";

// Sort diary array by date or number of sightings
export function sortDiary(diary: Diary[], option: DiarySortOptions) {
  switch (option) {
    case "dateAsc":
      return diary.sort((a, b) => {
        const dateA = DateTime.fromISO(a.date).toMillis();
        const dateB = DateTime.fromISO(b.date).toMillis();
        return dateA - dateB;
      });
    case "dateDesc":
      return diary.sort((a, b) => {
        const dateA = DateTime.fromISO(a.date).toMillis();
        const dateB = DateTime.fromISO(b.date).toMillis();
        return dateB - dateA;
      });
    default:
      return diary.sort((a, b) => b.count - a.count);
  }
}

// Sort list alphabetically by common name of bird
export function sortAlpha(entries: DiaryDetails[], option: "asc" | "desc") {
  switch (option) {
    case "desc":
      return entries.sort((a, b) => {
        if (a.commName > b.commName) return -1;
        if (a.commName < b.commName) return 1;
        return 0;
      });
    default:
      return entries.sort((a, b) => {
        if (a.commName < b.commName) return -1;
        if (a.commName > b.commName) return 1;
        return 0;
      });
  }
}
