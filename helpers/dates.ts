import { DateTime } from "luxon";

/** Create pure ISO date from JavaScript date. */
export function createPureIsoDate(d: Date) {
  const date = new Date(d);
  const isoDate = date.toISOString().split("T")[0];
  return isoDate;
}

/** Returns a locale string based on provided format
 * "short" (default) - "3/1/2025"
 * "med" - "Mar 1, 2025"
 * "full" - "March 1, 2025"
 * "huge" - "Saturday, March 1, 2025"
 * Use UTC zone to avoid date changes (ex: turn Mar 1 into Feb 28).
 */
export function createLocaleString(
  date: string,
  format?: "med" | "full" | "huge",
) {
  const dateFromIso = DateTime.fromISO(date, { zone: "utc" });

  switch (format) {
    case "med":
      return dateFromIso.toLocaleString(DateTime.DATE_MED);
    case "full":
      return dateFromIso.toLocaleString(DateTime.DATE_FULL);
    case "huge":
      return dateFromIso.toLocaleString(DateTime.DATE_HUGE);
    default:
      return dateFromIso.toLocaleString(DateTime.DATE_SHORT);
  }
}

/** Returns a relative date string (ex: "Today"). */
export function createRelativeDate(date: string) {
  // `toRelativeCalendar()` may return null if the date is invalid
  const relativeDate = DateTime.fromISO(date, {
    zone: "utc",
  }).toRelativeCalendar();
  if (relativeDate) {
    return relativeDate.slice(0, 1).toUpperCase() + relativeDate.slice(1);
  }
  // Return original date string if a relative date cannot be made
  return date;
}

export function convertSightingDateToInteger(date: string) {
  return Number(date.slice(0, 10).replaceAll("-", ""));
}

export function convertDateIdToValidDate(dateId: string) {
  if (dateId.length !== 8) return null;
  const parseDateToInt = Number(dateId);
  if (!parseDateToInt) return null;
  return `${dateId.slice(0, 4)}-${dateId.slice(4, 6)}-${dateId.slice(6)}`;
}
