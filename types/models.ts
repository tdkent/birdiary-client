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
export type SingleBirdWithCount = SingleBird & {
  count?: number;
};

// ======= SIGHTINGS =======

export type Sighting = {
  id: number;
  sightingId: string;
  userId: string;
  commName: string;
  locationId: number;
  date: string;
  desc: string;
};

// Location data may not include geometry data
// Locations with undefined geometry will be rejected by backend
export type Location = {
  name: string;
  lat: number | undefined;
  lng: number | undefined;
};

// Fetched sighting with optional location
export type FetchedSighting = Omit<Sighting, "userId" | "locationId"> & {
  location?: Location;
};

// Simplified storage model storedin local storage
export type StorageSighting = Omit<Sighting, "userId" | "locationId">;

export type NewSighting = {
  commName: string;
  date: string;
  desc: string;
  location?: Location;
};

// Sort sightings
export type SortValues = "alphaAsc" | "alphaDesc" | "dateAsc" | "dateDesc" | "";
export type SortOptions = { value: SortValues; text: string }[];

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

// ======= PROFILE =======

type Profile = {
  name: string;
  location: string;
};

export type UserProfile = {
  createdAt: string;
  email: string;
  profile: Profile;
  favoriteBird: Pick<Bird, "id" | "commName">;
  count: {
    totalSightings: number;
    totalDistinctSightings: number;
  };
};

// ======= SHARED =======
export type ListWithCount = {
  items: Sighting[] | SingleBirdWithCount[];
  countOfRecords: number;
};

export type ListPathname = "home" | "lifelist" | "birds";
