"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import { signUpUser, signInUser } from "@/data/endpoints";
import { NestResError } from "@/models/error";

export async function auth({
  email,
  password,
  pathname,
}: {
  email: string;
  password: string;
  pathname: "/signup" | "/signin";
}) {
  let endpoint: string;
  if (pathname === "/signup") {
    endpoint = signUpUser;
  } else {
    endpoint = signInUser;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData: NestResError = await response.json();
    return errorData;
  }

  if (pathname === "/signin") {
    const { id }: { id: string } = await response.json();
    await createSession(id);
  }
}

export async function signOut() {
  deleteSession();
  redirect("/signin");
}
