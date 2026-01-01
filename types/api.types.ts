export type RequestBody = { [key: string]: unknown };

export type ApiRequestInputs =
  | {
      method?: "DELETE";
      requestBody?: never;
      revalidate?: never;
      route: string;
    }
  | {
      method: "PATCH" | "POST" | "PUT";
      requestBody: object;
      revalidate?: "/users";
      route: string;
    };

export type Headers = {
  Authorization?: string;
  "Content-Type"?: "application/json";
};

export type RequestHeaders = {
  body?: string;
  headers?: Headers;
  method?: "DELETE" | "PATCH" | "POST" | "PUT";
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
