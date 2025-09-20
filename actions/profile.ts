import { BASE_URL } from "@/constants/env";
import { getCookie } from "@/helpers/auth";
import { apiRoutes, Messages } from "@/models/api";
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
    throw new Error(Messages.UnknownUnexpectedError);
  }
}

export async function editUserProfile(
  reqBody: Pick<UserProfile, "address" | "bio" | "name" | "zipcode">,
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
    throw new Error(Messages.UnknownUnexpectedError);
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
    throw new Error(Messages.UnknownUnexpectedError);
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
    throw new Error(Messages.UnknownUnexpectedError);
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
    throw new Error(Messages.UnknownUnexpectedError);
  }
}
