import type { Bird } from "@/types/bird.types";
import type { Location, NewLocation } from "@/types/location.types";

export type Sighting = {
  id: number;
  userId: number;
  birdId: number;
  locationId: number | null;
  date: string;
  description: string | null;
  isNew: boolean;
};

export type NewSighting = Pick<Sighting, "birdId" | "date" | "description"> & {
  location?: NewLocation;
};

// /bird/:id
export type SightingWithLocation = Sighting & { location: Location };

// /diary
export type SightingsDiary = {
  id: number;
  date: string;
  count: number;
  sightings: string[];
};

// diary/:id
export type SightingWithBirdAndLocation = SightingWithBird & {
  location: Location;
};

// /sightings
export type SightingWithBird = Sighting & { bird: Bird };

// Local storage
export type StorageDiary = Omit<SightingsDiary, "sightings">;
export type StorageSighting = Pick<
  Sighting,
  "id" | "birdId" | "date" | "description"
> & { bird: Pick<Bird, "commonName"> };
