import { apiRoutes, ExpectedServerError, Messages } from "@/models/api";
import { Bird } from "@/models/db";
import { cache } from "react";

export const getBird = cache(
  async (birdId: number): Promise<Bird | ExpectedServerError> => {
    try {
      const response = await fetch(apiRoutes.bird(birdId));
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error(Messages.UnknownUnexpectedError);
    }
  },
);
