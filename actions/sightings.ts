"use server";

import { newSightingEndpoint } from "@/data/endpoints";

export async function create(
  token: string,
  { commonName }: { commonName: string }
) {
  console.log(token, commonName);
  try {
    const response = await fetch(newSightingEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ commonName }),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error("An error occurred");
    }
  } catch (error) {
    console.error(error);
  }
}
