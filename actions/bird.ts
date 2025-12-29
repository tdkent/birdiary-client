import { apiRoutes } from "@/models/api";
import { cache } from "react";

export const getBird = cache(async (birdId: number) => {
  const response = await fetch(apiRoutes.bird(birdId));
  return response.json();
});
