"use server";

import { BASE_URL } from "@/constants/env";
import { getCookie } from "@/helpers/auth";
import { apiRoutes } from "@/models/api";
import type { RequestBody } from "@/types/api.types";
import type { StorageSighting } from "@/types/sighting.types";
import { revalidatePath } from "next/cache";

export async function getUser() {
  const token = await getCookie();
  const response = await fetch(BASE_URL + "/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function getUserStats() {
  const token = await getCookie();
  const response = await fetch(apiRoutes.userStats, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function editUserProfile(reqBody: RequestBody) {
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
}

export async function transferStorageData(storageData: StorageSighting[]) {
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
}

export async function updateFavoriteBird(favoriteBirdId: number | null) {
  const token = await getCookie();
  const response = await fetch(apiRoutes.userFavoriteBird, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ favoriteBirdId }),
  });
  if (response.ok) revalidatePath("/users");
  return response.json();
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string,
) {
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
}

export async function deleteAccount() {
  const token = await getCookie();
  const response = await fetch(apiRoutes.user, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
