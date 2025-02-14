import { serverUrl } from "@/constants/env";

const apiRoutes = {
  BIRDS: `${serverUrl}/birds`,
  SIGHTING: `${serverUrl}/sightings`,
  SIGNIN: `${serverUrl}/users/auth/signin`,
  SIGNUP: `${serverUrl}/users`,
} as const;

export default apiRoutes;
