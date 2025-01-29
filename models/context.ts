export type AuthContextType = {
  isSignedIn: boolean;
  token: string;
  signIn: () => void;
  signOut: () => void;
};
