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
  id: string;
  userId: string;
  commName: string;
  locationId: number;
  date: Date;
  desc: string;
};

export type RecentSighting = Omit<Sighting, "userId" | "locationId">;
export type NewSighting = Omit<RecentSighting, "id"> & { location?: Location };

// ======= LOCATIONS =======

// Location data may not include geometry data
// Locations with undefined geometry will be rejected by backend
export type Location = {
  name: string;
  lat: number | undefined;
  lng: number | undefined;
};
