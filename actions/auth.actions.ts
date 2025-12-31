"use server";

import { serverApiRequest } from "@/actions/api.actions";
import { createSession, deleteSession } from "@/lib/session";
import type { ApiResponse, Identifiable } from "@/types/api.types";
import { redirect } from "next/navigation";

type AuthActionInputs = {
  pathname: "/signin" | "/signup";
  requestBody: object;
};

export async function authAction({ pathname, requestBody }: AuthActionInputs) {
  const result: ApiResponse<Identifiable | null> = await serverApiRequest({
    method: "POST",
    requestBody,
    route: `/users${pathname}`,
  });

  if (result.error) return result;

  if (result.data) {
    await createSession(result.data.id);
  }

  return result;
}

export async function deleteSessionCookie() {
  await deleteSession();
}

export async function signOut() {
  await deleteSession();
  redirect("/signin");
}
