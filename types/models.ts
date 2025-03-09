//! Note: naming should match database conventions

// ======= BIRDS =======

export type Bird = {
  id: number;
  comm_name: string;
};

// ======= SIGHTINGS =======

// Base model
export type Sighting = {
  id: string;
  user_id: string;
  bird_id: number;
  location_id: number;
  date: Date;
  desc: string;
};

export type RecentSighting = Omit<Sighting, "user_id" | "location_id"> & {
  commName: string;
};
export type NewSighting = Omit<RecentSighting, "id">;

// ======= LOCATIONS =======

export type Location = {
  name: string;
  lat: number;
  lng: number;
};
