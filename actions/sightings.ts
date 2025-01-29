"use server";

import { newSightingEndpoint } from "@/data/endpoints";

export type Sighting = {
  bird_id: number;
  commonName: string;
  date: Date;
  location?: string;
  desc?: string;
};

export async function create(token: string, formValues: Sighting) {
  try {
    const response = await fetch(newSightingEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formValues),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("An error occurred");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
