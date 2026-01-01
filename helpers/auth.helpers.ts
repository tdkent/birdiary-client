"use server";

import { serverApiRequest } from "@/actions/api.actions";
import { decrypt } from "@/lib/session";
import type { ApiResponse } from "@/types/api.types";
import type { User } from "@/types/user.types";
import { cookies } from "next/headers";

export async function checkSession() {
  const cookie = await getCookie();

  if (!cookie) return false;

  const session = await decrypt(cookie);

  if (!session?.id) return false;

  return true;
}

export async function getCookie() {
  const cookie = (await cookies()).get("session")?.value;
  return cookie;
}

export async function getUserProfileOrNull() {
  const hasSession = await checkSession();
  if (!hasSession) return null;
  const result: ApiResponse<User> = await serverApiRequest({
    route: "/users",
  });
  if (result.error) return null;
  return {
    name: result.data.name ?? null,
    favoriteBirdId: result.data.favoriteBirdId ?? null,
  };
}
