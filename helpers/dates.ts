/**
 * Example date format: "2025-12-02T00:00:00.000Z".
 * Functions remove 'Z' (UTC) from end of string to remove timezone drift.
 */

import { DateTime } from "luxon";

/** Returns an ISO date w/o time. */
export function createIsoDateFromJsDate(date: Date) {
  const jsDate = DateTime.fromJSDate(date);
  return DateTime.fromObject({
    year: jsDate.year,
    month: jsDate.month,
    day: jsDate.day,
  }).toISODate() as string;
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
  const dateFromIso = DateTime.fromISO(removeTimeZoneFromDateString(date));
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
  const relativeDate = DateTime.fromISO(
    removeTimeZoneFromDateString(date),
  ).toRelativeCalendar();
  return relativeDate
    ? relativeDate.slice(0, 1).toUpperCase() + relativeDate.slice(1)
    : "N/A";
}

export function convertSightingDateToInteger(date: string) {
  return Number(date.slice(0, 10).replaceAll("-", ""));
}

function removeTimeZoneFromDateString(date: string) {
  return date.slice(-1) === "Z" ? date.slice(0, -1) : date;
}

/** Check 8-digit id for valid date and convert to ISO date string. */
export function convertDateIdToValidDate(dateId: string) {
  if (dateId.length !== 8 || isNaN(Number(dateId))) return null;
  const isoStr = `${dateId.slice(0, 4)}-${dateId.slice(4, 6)}-${dateId.slice(6)}`;
  const validDate = DateTime.fromISO(isoStr);
  if (!validDate || validDate > DateTime.now() || validDate.year < 1950)
    return null;
  return DateTime.fromObject({
    year: Number(dateId.slice(0, 4)),
    month: Number(dateId.slice(4, 6)),
    day: Number(dateId.slice(6)),
  }).toISODate() as string;
}

export const CURR_YEAR = DateTime.now().year;
