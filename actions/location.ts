import { getCookie } from "@/helpers/auth";
import { apiRoutes, type ExpectedServerError, Messages } from "@/models/api";
import type { Location } from "@/models/db";
import type { CreateLocationDto } from "@/models/form";
import { cache } from "react";

export const getLocation = cache(
  async (locationId: number): Promise<Location | ExpectedServerError> => {
    try {
      const token = await getCookie();
      const response = await fetch(apiRoutes.location(locationId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error(Messages.UnknownUnexpectedError);
    }
  },
);

export async function editLocation(id: number, formValues: CreateLocationDto) {
  try {
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
  } catch (error) {
    console.error(error);
    throw new Error(Messages.UnknownUnexpectedError);
  }
}

export async function deleteLocation(id: number) {
  try {
    const token = await getCookie();
    const response = await fetch(apiRoutes.location(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(Messages.UnknownUnexpectedError);
  }
}
