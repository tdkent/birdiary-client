export type NestResError = {
  message: string;
  error: string;
  statusCode: number;
};

export enum ErrorMessages {
  Default = "An unexpected error occurred. Please try again later.",
}
