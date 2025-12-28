export type ApiResponse<T> = {
  count: number;
  data: T | T[];
  error: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
};

export type RequestBody = { [key: string]: unknown };
