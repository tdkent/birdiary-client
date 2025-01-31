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

    // Return expected error object containing error property
    if (!response.ok) {
      return response.json();
    }
  } catch {
    // Unexpected errors bubble to nearest error boundary
    throw new Error(
      "An unexpected error occurred while attempting to create the new sighting. Please try again later."
    );
  }
}
