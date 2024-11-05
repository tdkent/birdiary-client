"use server";

import { createSession } from "@/lib/session";
import { signInUser } from "@/data/endpoints";

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
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

  const { userId }: { userId: string } = await response.json();
  const session = await createSession(userId);
  return session;
}
