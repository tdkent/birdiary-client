import { serverUrl } from "@/constants/env";

// Auth
export const signUpUser = serverUrl + "users";
export const signInUser = serverUrl + "users/auth/signin";

// Bird
export const findAllBirds = serverUrl + "bird";

// Sighting
export const newSightingEndpoint = serverUrl + "sightings";
