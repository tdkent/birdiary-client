"use server";

import { signInUser } from "@/data/endpoints";

export async function signIn(email: string, password: string) {
  const response = await fetch(signInUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to sign in user.");
  }

  const data = await response.json();
  return data;
}
