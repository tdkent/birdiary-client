import { apiRoutes } from "@/types/api";
import { BASE_URL } from "@/constants/env";
import { getCookie } from "@/helpers/auth";
import { ErrorMessages } from "@/types/api";

export async function getLocation(id: string) {
  try {
    const token = await getCookie();
    const response = await fetch(BASE_URL + apiRoutes.locationDetails(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.Default);
  }
}
