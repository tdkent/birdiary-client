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
export type NewSighting = Omit<RecentSighting, "id"> & { location?: Location };

// ======= LOCATIONS =======

// Location data may not be geocoded
export type Location = {
  name: string;
  lat: number | undefined;
  lng: number | undefined;
};
