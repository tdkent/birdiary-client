"use server";

import { getUser } from "@/actions/api.actions";
import { decrypt } from "@/lib/session";
import DOMPurify from "isomorphic-dompurify";
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
  const result = await getUser();
  if (result.error) return null;

  const sanitizeName = result.data.name
    ? DOMPurify.sanitize(result.data.name)
    : result.data.name;

  return {
    name: sanitizeName ?? null,
    favoriteBirdId: result.data.favoriteBirdId ?? null,
  };
}
