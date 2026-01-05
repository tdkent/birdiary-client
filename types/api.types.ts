export type RequestBody = { [key: string]: unknown };

export type Tags = "location" | "sighting" | "user";

export type ApiRequestInputs =
  | {
      method?: never;
      requestBody?: never;
      revalidateTags?: never;
      revalidateTime?: number;
      route: string;
      tags?: Tags[];
    }
  | {
      method: "DELETE" | "PATCH" | "POST" | "PUT";
      requestBody?: object;
      revalidateTags?: Tags[];
      revalidateTime?: never;
      route: string;
      tags?: never;
    };

export type Headers = {
  Authorization?: string;
  "Content-Type"?: "application/json";
};

export type RequestHeaders = {
  body?: string;
  cache?: "force-cache";
  headers?: Headers;
  method?: "DELETE" | "PATCH" | "POST" | "PUT";
  next?: {
    revalidate?: number;
    tags?: Tags[];
  };
};

export type ApiResponse<T> =
  | {
      count: number;
      data: T;
      error: false;
      message: "ok";
      statusCode: number;
      timestamp: string;
    }
  | {
      count: null;
      data: null;
      error: true;
      message: string;
      statusCode: number;
      timestamp: string;
    };

export type Identifiable = {
  id: number;
};
