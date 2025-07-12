import { apiRoutes } from "@/models/api";
import { getCookie } from "@/helpers/auth";
import { ErrorMessages } from "@/models/api";
import type { Location } from "@/models/db";

export async function getLocation(id: number) {
  try {
    const token = await getCookie();
    const response = await fetch(apiRoutes.location(id), {
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
    throw new Error(ErrorMessages.Default);
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
    throw new Error(ErrorMessages.Default);
  }
}
