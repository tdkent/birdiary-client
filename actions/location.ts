import { getCookie } from "@/helpers/auth";
import { apiRoutes, Messages } from "@/models/api";
import type { CreateLocationDto } from "@/models/form";

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
    throw new Error(Messages.UnknownUnexpectedError);
  }
}

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
