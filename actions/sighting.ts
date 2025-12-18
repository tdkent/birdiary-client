"use server";

import { getCookie } from "@/helpers/auth";
import type { ExpectedServerError } from "@/models/api";
import { apiRoutes } from "@/models/api";
import type { SightingWithBirdAndLocation } from "@/models/display";
import { cache } from "react";

export const getSighting = cache(
  async (
    sightingId: number,
  ): Promise<SightingWithBirdAndLocation | ExpectedServerError> => {
    const token = await getCookie();
    const response = await fetch(apiRoutes.sighting(sightingId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
);
