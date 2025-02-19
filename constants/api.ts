import { SERVER_URL } from "@/constants/env";

const BIRD = "/birds";
const SIGHTING = "/sightings";
const USER = "/users";
const SIGNIN = "/auth/signin";

const API_ROUTES = {
  BIRDS: SERVER_URL + BIRD,
  SIGHTING: SERVER_URL + SIGHTING,
  SIGNIN: SERVER_URL + USER + SIGNIN,
  SIGNUP: SERVER_URL + USER,
} as const;

export default API_ROUTES;
