import { BASE_URL } from "@/constants/env";
import { ErrorMessages } from "@/models/api";
import { getCookie } from "@/helpers/auth";

export async function updatePassword(
  currentPassword: string,
  newPassword: string,
) {
  try {
    const token = await getCookie();
    const response = await fetch(BASE_URL + "/users/password", {
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
    throw new Error(ErrorMessages.Default);
  }
}
