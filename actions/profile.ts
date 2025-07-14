import { BASE_URL } from "@/constants/env";
import { apiRoutes, Messages } from "@/models/api";
import { getCookie } from "@/helpers/auth";
import { UserProfile } from "@/models/display";

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
    const response = await fetch(apiRoutes.user(id), {
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
