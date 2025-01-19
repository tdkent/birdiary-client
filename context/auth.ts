import { createContext } from "react";
import { AuthContextType } from "@/models/context";

export const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  token: "",
  signIn: () => {},
  signOut: () => {},
});
