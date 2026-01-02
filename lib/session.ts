import CONFIG from "@/constants/config.constants";
import * as Sentry from "@sentry/nextjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

const encodedKey = new TextEncoder().encode(CONFIG.SESSION_KEY);

export async function encrypt(payload: { id: number }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    if (error instanceof Error) {
      Sentry.logger.error(error.message);
    } else {
      Sentry.logger.error("An unknown error occurred.");
    }
  }
}

export async function createSession(id: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ id });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
