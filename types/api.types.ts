export type RequestBody = { [key: string]: unknown };

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
