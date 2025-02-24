// ======= REQUESTS =======

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

// ======= RESPONSES =======

// Expected errors received from the server
// `error`: Name of the error
// `statusCode`: Status code of the error
// `message`: Array of class-validator error strings

// Example expected error:
// {
//   error: "Bad Request",
//   statusCode: 400,
//   message: [
//     "bird_id must not be less than 1",
//     "maximal allowed date for date is Sun Feb 23 2025 15:53:48 GMT-0800 (Pacific Standard Time)"
//   ]
// }
export type ExpectedServerError = {
  error: string;
  statusCode: number;
  message: string[];
};

export enum ErrorMessages {
  Default = "An unexpected error occurred. Please try again later.",
}

export type SuccessResponse = {
  message: "ok";
};
