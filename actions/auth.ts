"use server";

import { BASE_URL } from "@/constants/env";
import { createSession, deleteSession } from "@/lib/session";
import { ExpectedServerError, Messages } from "@/models/api";
import type { AuthParams, AuthResponse } from "@/models/auth";
import { redirect } from "next/navigation";

/** Sign up or sign in a user */
export async function auth({ pathname, ...args }: AuthParams) {
  try {
    const response = await fetch(`${BASE_URL}/users${pathname}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    const data: ExpectedServerError | AuthResponse = await response.json();

    if (!response.ok) {
      return data as ExpectedServerError;
    }

    if ("id" in data) {
      await createSession(data.id);
    } else {
      throw new Error("Invalid data format in response object");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(Messages.UnknownUnexpectedError);
  }
}

export async function deleteSessionCookie() {
  await deleteSession();
}

export async function signOut() {
  await deleteSession();
  redirect("/signin");
}
