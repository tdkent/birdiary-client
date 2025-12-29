export type Bird = {
  id: number;
  commonName: string;
  count?: number; // included w/session
  scientificName: string;
  family: string;
  description: string;
  rarity: string;
  imgAttribute: string | null;
  imgPublicId: string | null;
  imgSecureUrl: string | null;
};

// /lifelist
export type LifeListBird = Pick<Bird, "id" | "commonName" | "imgSecureUrl"> & {
  date: string;
  count: number;
};
