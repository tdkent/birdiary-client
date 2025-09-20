"use server";

import { decrypt } from "@/lib/session";
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
