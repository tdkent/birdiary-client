// ======= HTTP REQUESTS =======

// Data for GET requests
export type QueryParameters = {
  key: "sightings";
  route: string;
};

// Data for POST, PATCH, DELETE requests
export type MutationParameters<T> = {
  key: "sightings";
  route: string;
  method: "POST";
  formValues: T;
};

// ======= ERRORS =======

// Expected errors received from the server
export type NestResError = {
  message: string;
  error: string;
  statusCode: number;
};

export enum ErrorMessages {
  Default = "An unexpected error occurred. Please try again later.",
}

// ======= RESPONSE BODIES =======

export type RecentSighting = {
  id: number;
  date: Date;
  bird: {
    comm_name: string;
    id: number;
  };
};
