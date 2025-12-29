export type Location = {
  id: number;
  lat: number | undefined;
  lng: number | undefined;
  name: string;
  userId: number;
};

export type NewLocation = Omit<Location, "id" | "userId">;

// /locations
export type LocationsList = {
  id: number;
  count: number;
  name: string;
  sightings: string[] | null;
};
