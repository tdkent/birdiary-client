import { getCookie } from "@/helpers/auth";
import { apiRoutes, type ExpectedServerError } from "@/models/api";
import type { Location } from "@/models/db";
import type { RequestBody } from "@/types/api.types";
import { cache } from "react";

export const getLocation = cache(
  async (locationId: number): Promise<Location | ExpectedServerError> => {
    const token = await getCookie();
    const response = await fetch(apiRoutes.location(locationId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
);

export async function editLocation(id: number, formValues: RequestBody) {
  const token = await getCookie();
  const response = await fetch(apiRoutes.location(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formValues),
  });
  return response.json();
}

export async function deleteLocation(id: number) {
  const token = await getCookie();
  const response = await fetch(apiRoutes.location(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
