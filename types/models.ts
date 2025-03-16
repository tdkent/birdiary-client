//! Note: naming should match database conventions

// ======= BIRDS =======

export type Bird = {
  id: number;
  commName: string;
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
export type NewSighting = Omit<RecentSighting, "id">;

// ======= LOCATIONS =======

export type Location = {
  name: string;
  lat: number;
  lng: number;
};
