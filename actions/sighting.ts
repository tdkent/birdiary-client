"use server";

import { getCookie } from "@/helpers/auth";
import { apiRoutes } from "@/models/api";
import { cache } from "react";

export const getSighting = cache(async (sightingId: number) => {
  const token = await getCookie();
  const response = await fetch(apiRoutes.sighting(sightingId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
});
