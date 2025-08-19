import { BASE_URL } from "@/constants/env";
import { apiRoutes, Messages } from "@/models/api";
import { getCookie } from "@/helpers/auth";
import type { SightingInStorage, UserProfile } from "@/models/display";

export async function getUser() {
  const token = await getCookie();
  try {
    const response = await fetch(BASE_URL + "/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(Messages.DefaultError);
  }
}

export async function editUserProfile(
  id: number,
  reqBody: Pick<UserProfile, "name" | "zipcode" | "address">,
) {
  try {
    const token = await getCookie();
    const response = await fetch(apiRoutes.user, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqBody),
    });

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(Messages.DefaultError);
  }
}

export async function transferStorageData(storageData: SightingInStorage[]) {
  try {
    const token = await getCookie();
    const response = await fetch(apiRoutes.userStorage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(storageData),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(Messages.DefaultError);
  }
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string,
) {
  try {
    const token = await getCookie();
    const response = await fetch(apiRoutes.userPassword, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(Messages.DefaultError);
  }
}

export async function deleteAccount() {
  try {
    const token = await getCookie();
    const response = await fetch(apiRoutes.user, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(Messages.DefaultError);
  }
}
