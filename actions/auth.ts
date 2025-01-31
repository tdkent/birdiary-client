"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import { signUpUser, signInUser } from "@/data/endpoints";
import { NestResError } from "@/models/error";

type AuthParams = {
  email: string;
  password: string;
  pathname: "/signup" | "/signin";
};

// This function handles both 'Sign up' and 'Sign in' auth actions
// The request body contains the email and password in both cases
// The API endpoint is determined based on pathname from params
export async function auth({ email, password, pathname }: AuthParams) {
  let endpoint: string;
  if (pathname === "/signup") {
    endpoint = signUpUser;
  } else {
    endpoint = signInUser;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: NestResError | { id: string } = await response.json();

    // Return expected error object containing error property
    if (!response.ok) {
      return data as NestResError;
    }

    if (pathname === "/signin") {
      // Use type guard to check that the id is in the response object
      if ("id" in data) {
        await createSession(data.id);
      } else {
        throw new Error("Invalid data format in response object");
      }
    }
  } catch {
    // Unexpected errors bubble to nearest error boundary
    throw new Error(
      "An unexpected error occurred during the authentication process. Please try again later."
    );
  }
}

export async function signOut() {
  deleteSession();
  redirect("/signin");
}
