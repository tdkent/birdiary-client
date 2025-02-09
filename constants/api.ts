import { serverUrl } from "@/constants/env";

const apiRoutes = {
  SIGHTING: `${serverUrl}/sightings`,
} as const;

export default apiRoutes;
