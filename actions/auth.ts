"use server";

import { BASE_URL } from "@/constants/env";
import { createSession, deleteSession } from "@/lib/session";
import { apiRoutes, ExpectedServerError } from "@/models/api";
import type { AuthParams, AuthResponse } from "@/models/auth";
import { redirect } from "next/navigation";

/** Sign up or sign in a user */
export async function auth({ pathname, ...args }: AuthParams) {
  const response = await fetch(`${BASE_URL}/users${pathname}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });

  const data:
    | ExpectedServerError
    | AuthResponse
    | { email: string }
    | { success: boolean } = await response.json();

  if (!response.ok) {
    return data as ExpectedServerError;
  }

  if ("id" in data) {
    await createSession(data.id);
  }

  return data;
}

export async function resendVerification(
  email: string,
  verificationId: string,
) {
  const response = await fetch(apiRoutes.userVerifyResend, {
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

export async function verifyUser(email: string, verificationId: string) {
  const response = await fetch(apiRoutes.userVerifyComplete, {
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
