"use server";

import { newSightingEndpoint } from "@/data/endpoints";
import { ErrorMessages } from "@/models/error";

export type Sighting = {
  bird_id: number;
  commonName: string;
  date: Date;
  location?: string;
  desc?: string;
};

// This action sends POST request for both 'simple' and 'detailed' sightings
// 'location' and 'desc' are undefined in 'simple' sightings
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
    throw new Error(ErrorMessages.Default);
  }
}
