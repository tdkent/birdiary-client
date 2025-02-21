// ======= BIRDS =======

export type Bird = {
  id: number;
  comm_name: string;
};

// ======= SIGHTINGS =======

export type Sighting = {
  bird_id: number;
  commonName: string;
  date: Date;
  location?: Location;
  desc: string;
};

// ======= LOCATIONS =======

export type Location = {
  name: string;
  lat: number;
  lng: number;
};
