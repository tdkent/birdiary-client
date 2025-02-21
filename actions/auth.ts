"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import apiRoutes from "@/constants/api";
import { NestResError, ErrorMessages } from "@/types/error";

type AuthParams = {
  email: string;
  password: string;
  pathname: "/signup" | "/signin";
};

// This function handles both 'Sign up' and 'Sign in' auth actions
// The request body contains the email and password in both cases
// The API endpoint is determined based on pathname from params
// ...args is a rest parameter of type { email:string; password: string }
export async function auth({ pathname, ...args }: AuthParams) {
  let endpoint: string;
  if (pathname === "/signup") {
    endpoint = apiRoutes.SIGNUP;
  } else {
    endpoint = apiRoutes.SIGNIN;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
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
    throw new Error(ErrorMessages.Default);
  }
}

export async function signOut() {
  deleteSession();
  redirect("/signin");
}
