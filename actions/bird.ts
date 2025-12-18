import { apiRoutes, ExpectedServerError } from "@/models/api";
import { Bird } from "@/models/db";
import { cache } from "react";

export const getBird = cache(
  async (birdId: number): Promise<Bird | ExpectedServerError> => {
    const response = await fetch(apiRoutes.bird(birdId));
    return response.json();
  },
);
