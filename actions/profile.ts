import { BASE_URL } from "@/constants/env";
import { Messages } from "@/models/api";
import { getCookie } from "@/helpers/auth";

export async function getUser() {
  // ? Remove try/catch?
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
    throw new Error(Messages.DefaultError);
  }
}
