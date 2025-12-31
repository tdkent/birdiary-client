"use server";

import CONFIG from "@/constants/config.constants";
import { getCookie } from "@/helpers/auth";

type ApiRequestInputs =
  | {
      method?: "DELETE";
      requestBody?: never;
      route: string;
    }
  | {
      method: "PATCH" | "POST" | "PUT";
      requestBody: object;
      route: string;
    };

type Headers = {
  Authorization?: string;
  "Content-Type"?: "application/json";
};

type RequestHeaders = {
  body?: string;
  headers?: Headers;
  method?: "DELETE" | "PATCH" | "POST" | "PUT";
};

export async function serverApiRequest({
  method,
  route,
  requestBody,
}: ApiRequestInputs) {
  console.log("Server-side api request at", new Date().toISOString());

  const url = CONFIG.BASE_URL + route;

  const requestHeaders: RequestHeaders = {};
  const headers: Headers = {};

  const jwt = await getCookie();

  if (jwt) headers["Authorization"] = `Bearer ${jwt}`;
  if (method) requestHeaders["method"] = method;
  if (requestBody) {
    headers["Content-Type"] = "application/json";
    requestHeaders["body"] = JSON.stringify(requestBody);
  }
  if (Object.keys(headers).length) requestHeaders["headers"] = headers;

  const res = await fetch(url, requestHeaders);
  return res.json();
}
