// Dates are ISO 8601 formatted date strings

// ======= BIRDS =======

// The family to which a bird species belongs
export type Family = {
  id: number;
  name: string;
};

// Details about an individual bird species
export type Bird = {
  id: number;
  commName: string;
  sciName: string;
  desc: string;
  rarity: "Common" | "Uncommon" | "Rare";
  imgAttr: string | null;
  imgUrl: string | null;
  familyId: number;
};

export type SingleBird = Omit<Bird, "familyId"> & { family: Family };

// ======= SIGHTINGS =======

// Base model
export type Sighting = {
  sightingId: string;
  userId: string;
  commName: string;
  locationId: number;
  date: string;
  desc: string;
};

// Simplified storage model storedin local storage
export type StorageSighting = Omit<Sighting, "userId" | "locationId">;

export type NewSighting = {
  commName: string;
  date: string;
  desc: string;
  location?: Location;
};

// ======= DIARY =======

export type Diary = {
  date: string;
  count: number;
};

export type DiaryDetails = StorageSighting & {
  location?: Location;
};

export type DiarySortOptions = "dateDesc" | "dateAsc" | "sightings";

// ======= LOCATIONS =======

// Location data may not include geometry data
// Locations with undefined geometry will be rejected by backend
export type Location = {
  name: string;
  lat: number | undefined;
  lng: number | undefined;
};
