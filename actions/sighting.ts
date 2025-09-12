"use server";

import { getCookie } from "@/helpers/auth";
import { apiRoutes, Messages } from "@/models/api";

export async function getSighting(id: number) {
  try {
    const token = await getCookie();
    const response = await fetch(apiRoutes.sighting(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(Messages.UnknownUnexpectedError);
  }
}
