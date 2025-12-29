import type { Bird } from "@/types/bird.types";
import type { Location } from "@/types/location.types";

export type Sighting = {
  id: number;
  userId: number;
  birdId: number;
  locationId: number | null;
  date: string;
  description: string | null;
  isNew: boolean;
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
