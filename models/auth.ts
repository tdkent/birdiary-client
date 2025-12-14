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
  cftToken: string;
  email: string;
  password: string;
  pathname: "/signup" | "/signin";
};

// Response object sent by server after signin
// The id is used to create the session jwt
export type AuthResponse = { id: string; count: number | null };
