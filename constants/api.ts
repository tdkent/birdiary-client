import { SERVER_URL } from "@/constants/env";

const BIRD = "/birds";
const SIGHTING = "/sightings";
const USER = "/users";

const apiRoutes = {
  BIRDS: SERVER_URL + BIRD,
  SIGHTING: SERVER_URL + SIGHTING,
  SIGHTING_ALL: SERVER_URL + SIGHTING,
  SIGHTING_RECENT: (page: number) => `${SERVER_URL}${SIGHTING}/recent/${page}`,
  SIGNIN: SERVER_URL + USER + "/auth/signin",
  SIGNUP: SERVER_URL + USER,
} as const;

export default apiRoutes;
