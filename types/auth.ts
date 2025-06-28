import type { Sighting } from "@/types/models";

// Manage application state from Context API
export type AuthState = {
  isSignedIn: boolean;
  token: string;
  signIn: () => void;
  signOut: () => void;
};

// Authentication credentials required for both
// signup and signin routes. `pathname` is used
// to determine the auth route.
export type AuthParams = {
  email: string;
  password: string;
  pathname: "/signup" | "/signin";
  storageData: Sighting[] | null;
};

// Response object sent by server after signin
// The id is used to create the session jwt
export type AuthResponse = { id: string };
