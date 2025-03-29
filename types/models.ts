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
  family: Family;
};

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

export type NewSighting = {
  commName: string;
  date: Date;
  desc: string;
  location?: Location;
};

// ======= DIARY =======

export type Diary = {
  date: string;
  _count: { _all: number };
};

// ======= LOCATIONS =======

// Location data may not include geometry data
// Locations with undefined geometry will be rejected by backend
export type Location = {
  name: string;
  lat: number | undefined;
  lng: number | undefined;
};
