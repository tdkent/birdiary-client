"use server";

import { BASE_URL } from "@/constants/env";
import { createSession, deleteSession } from "@/lib/session";
import { apiRoutes, ExpectedServerError } from "@/models/api";
import type { ApiResponse, Identifiable } from "@/types/api-response.types";
import { redirect } from "next/navigation";

/** Sign up or sign in a user */
export async function auth({
  pathname,
  ...args
}: {
  pathname: "/signup" | "/signin";
  [key: string]: string;
}) {
  const response = await fetch(`${BASE_URL}/users${pathname}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });

  const result: ApiResponse<Identifiable | null> = await response.json();

  if (result.error) return result;

  if (result.data) {
    await createSession(result.data.id);
  }

  return result;
}

export async function verifyUser(email: string, verificationId: string) {
  const response = await fetch(apiRoutes.userVerifyEmail, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, verificationId }),
  });
  const data: ExpectedServerError | { success: boolean } =
    await response.json();
  return data;
}

export async function forgotPassword(email: string) {
  const response = await fetch(apiRoutes.userForgotPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data: ExpectedServerError | { success: boolean } =
    await response.json();
  return data;
}

export async function verifyResetPassword(token: string) {
  const response = await fetch(apiRoutes.userVerifyResetPassword(token));
  const data: ExpectedServerError | { success: boolean } =
    await response.json();
  return data;
}

export async function resetPassword(password: string, token: string) {
  const response = await fetch(apiRoutes.userResetPassword, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  });
  const data: ExpectedServerError | { success: boolean } =
    await response.json();
  return data;
}

export async function deleteSessionCookie() {
  await deleteSession();
}

export async function signOut() {
  await deleteSession();
  redirect("/signin");
}
