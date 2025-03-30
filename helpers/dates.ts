import { DateTime } from "luxon";

// Returns date in UTC formt: "YYYY-MM-DDT00:00:00.000Z"
export function createUtcDate(d: Date) {
  const date = new Date(d);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

// Returns a date converted to a locale string
export function createLocaleString(date: string) {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
}

// Returns a relative date string (ex: "Today")
export function createRelativeDate(date: string) {
  // `toRelativeCalendar()` may return null if the date is invalid
  const relativeDate = DateTime.fromISO(date).toRelativeCalendar();
  if (relativeDate) {
    return relativeDate.slice(0, 1).toUpperCase() + relativeDate.slice(1);
  }
  // Return original date string if a relative date cannot be made
  return date;
}
