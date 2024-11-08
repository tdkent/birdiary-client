export type AuthContextType = {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};
