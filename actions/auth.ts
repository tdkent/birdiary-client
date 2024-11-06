"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import { signInUser } from "@/data/endpoints";
import { NestResError } from "@/models/error";

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
    const errorData: NestResError = await response.json();
    return errorData;
  }

  const { id }: { id: string } = await response.json();
  await createSession(id);
}

export async function signOut() {
  deleteSession();
  redirect("/signin");
}
