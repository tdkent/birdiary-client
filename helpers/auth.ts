"use server";

import { getUser } from "@/actions/profile";
import { decrypt } from "@/lib/session";
import type { ExpectedServerError } from "@/models/api";
import type { User } from "@/models/db";
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
  const result: ExpectedServerError | User = await getUser();
  if ("error" in result) return null;
  return {
    name: result.name ?? null,
    favoriteBirdId: result.favoriteBirdId ?? null,
  };
}
