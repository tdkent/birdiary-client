"use server";

import CONFIG from "@/constants/config.constants";

type ApiRequestInputs =
  | {
      method?: never;
      requestBody?: never;
      route: string;
    }
  | {
      method: "DELETE" | "PATCH" | "POST" | "PUT";
      requestBody: object;
      route: string;
    };

export async function serverApiRequest({
  method,
  route,
  requestBody,
}: ApiRequestInputs) {
  console.log("Server-side api request at", new Date().toISOString());
  const url = CONFIG.BASE_URL + route;
  const res = await fetch(url);
  return res.json();
}
