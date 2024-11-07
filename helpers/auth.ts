"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export async function checkSession() {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return false;

  const session = await decrypt(cookie);

  if (!session?.id) return false;

  return true;
}
