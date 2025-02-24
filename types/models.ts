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

// Recent sighting: intersection of partial Sighting and Bird types
export type RecentSighting = Omit<Sighting, "user_id" | "location_id"> &
  Pick<Bird, "comm_name">;

// New quick sighting data: omit "id" since it has not been created
export type NewQuickSighting = Omit<RecentSighting, "id">;

// ======= LOCATIONS =======

export type Location = {
  name: string;
  lat: number;
  lng: number;
};
