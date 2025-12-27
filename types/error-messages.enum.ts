export enum ErrorMessages {
  BadRequest = "The request is not valid. Please try again.",
  CftExpired = "The verification widget expired. Please try again.",
  ExpiredResetToken = "Invalid request. Your reset link may be invalid or expired. Please try signing in again to receive a new reset link.",
  InvalidContext = "Context must be used within a provider.",
  InvalidLocation = "Please select a location from the dropdown menu.",
  InvalidSession = "Session expired, please log in again.",
  InvalidZip = "Please enter a valid zip code.",
  NotFound = "The requested resource was not found.",
  SearchStringLength = "Please enter 3-32 characters.",
  ServerOutage = "We’re having trouble reaching the server right now. Please try again in a moment.",
  Unexpected = "An unexpected error occurred. Reloading the page may help, or you can try again later.",
  ZipCodeNoResultsError = "The provided zip code did not return any results.",
}
