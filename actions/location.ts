import { apiRoutes } from "@/models/api";
import { BASE_URL } from "@/constants/env";
import { getCookie } from "@/helpers/auth";
import { ErrorMessages } from "@/models/api";
import type { Location } from "@/models/db";

export async function getLocation(id: number) {
  try {
    const token = await getCookie();
    const response = await fetch(apiRoutes.getLocation(id), {
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

export async function editLocation(id: number, formValues: Location) {
  try {
    const token = await getCookie();
    const response = await fetch(BASE_URL + apiRoutes.singleLocation(id), {
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
    throw new Error(ErrorMessages.Default);
  }
}

export async function deleteLocation(id: number) {
  try {
    const token = await getCookie();
    const response = await fetch(BASE_URL + apiRoutes.singleLocation(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.Default);
  }
}
