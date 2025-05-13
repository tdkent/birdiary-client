import { BASE_URL } from "@/constants/env";
import { ErrorMessages } from "@/types/api";
import { getCookie } from "@/helpers/auth";

export async function getUser() {
  try {
    const token = await getCookie();
    const response = await fetch(BASE_URL + "/users/profile", {
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

export async function editUserProfile(formData: {
  name: string;
  location: string;
}) {
  try {
    const token = await getCookie();
    const response = await fetch(BASE_URL + "/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.Default);
  }
}
