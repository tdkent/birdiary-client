"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import type { AuthParams, AuthResponse } from "@/types/auth";
import { ExpectedServerError, ErrorMessages } from "@/types/api";
import { apiRoutes } from "@/types/api";

/** Sign up or sign in a user */
export async function auth({ pathname, ...args }: AuthParams) {
  let endpoint: string;
  if (pathname === "/signup") {
    endpoint = apiRoutes.signup;
  } else {
    endpoint = apiRoutes.signin;
  }

  try {
    const response = await fetch(endpoint, {
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

    if (pathname === "/signin") {
      if ("id" in data) {
        await createSession(data.id);
      } else {
        throw new Error("Invalid data format in response object");
      }

      return data;
    }
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.Default);
  }
}

export async function signOut() {
  deleteSession();
  redirect("/signin");
}
