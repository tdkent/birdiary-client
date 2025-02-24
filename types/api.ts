// ======= HTTP REQUESTS =======

// Local storage key and web server route
// Standard params for GET requests
export type QueryParameters = {
  key: "sightings";
  route: string;
};

// Capture all information needed for POST, PATCH, DELETE requests
export type MutationParameters<T> = QueryParameters & {
  method: "POST" | "PATCH" | "DELETE";
  formValues: T;
};

// Information needed for db mutation
export type MutateDbParameters<T> = Omit<MutationParameters<T>, "key">;

// Information needed for storage mutation
export type MutateStorageParameters<T> = Omit<MutationParameters<T>, "route">;

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
