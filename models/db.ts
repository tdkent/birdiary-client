export type Bird = {
  id: number;
  commonName: string;
  scientificName: string;
  family: string;
  description: string;
  rarity: "Common" | "Uncommon" | "Rare";
  imgAttribute: string | null;
  imgUrl: string | null;
};

export type Location = {
  id: number;
  name: string;
  lat: number | undefined;
  lng: number | undefined;
};

export type Sighting = {
  id: number;
  userId: number;
  birdId: number;
  locationId: number | null;
  date: string;
  description: string | null;
  isNew: boolean;
};

export type User = {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  name: string | null;
  bio: string | null;
  zipcode: string | null;
  address: string | null;
  favoriteBirdId: number | null;
};
