import { DateTime } from "luxon";

// Returns date string in ISO/UTC format: "YYYY-MM-DDT00:00:00.000Z"
// Date objs convert to ISO string when serialized w/ JSON.stringify(),
// so we will go ahead and create a date string instead.
// Note: Luxon’s DateTime.toISODate() method is typed as "string | null"
export function createIsoUtcDate(d: Date) {
  // Check that d is a valid date
  let date: Date;
  if (d instanceof Date && !isNaN(d.getTime())) {
    // return DateTime.fromJSDate(d).toISODate();
    date = new Date(d);
  } else {
    date = new Date();
  }

  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  ).toISOString();
}

// Returns a date converted to a locale string
// Force to UTC format to avoid date changes (ex: turn Mar 1 into Feb 28)
export function createLocaleString(date: string) {
  return DateTime.fromISO(date, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED,
  );
}

// Returns a relative date string (ex: "Today")
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
