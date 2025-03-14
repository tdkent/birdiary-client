"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import { BASE_URL } from "@/constants/env";
import type { AuthParams, AuthResponse } from "@/types/auth";
import { ExpectedServerError, ErrorMessages } from "@/types/api";

// This function handles both 'Sign up' and 'Sign in' auth actions
// The request body contains the email and password in both cases
// The API endpoint is determined based on pathname from params
// ...args is a rest parameter of type { email:string; password: string }
export async function auth({ pathname, ...args }: AuthParams) {
  let endpoint: string;
  if (pathname === "/signup") {
    endpoint = BASE_URL + "/users";
  } else {
    endpoint = BASE_URL + "/users/auth/signin";
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

    // Return expected error object containing error property
    if (!response.ok) {
      return data as ExpectedServerError;
    }

    if (pathname === "/signin") {
      // Use type guard to check that the id is in the response object
      if ("id" in data) {
        await createSession(data.id);
      } else {
        throw new Error("Invalid data format in response object");
      }
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
