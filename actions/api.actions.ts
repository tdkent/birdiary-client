"use server";

import CONFIG from "@/constants/config.constants";
import { getCookie } from "@/helpers/auth";
import { ApiRequestInputs, Headers, RequestHeaders } from "@/types/api.types";
import { revalidatePath } from "next/cache";

export async function serverApiRequest({
  method,
  route,
  requestBody,
  revalidate,
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

  if (res.ok && revalidate) revalidatePath(revalidate);

  return res.json();
}
