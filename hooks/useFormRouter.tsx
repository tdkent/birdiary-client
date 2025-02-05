import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import useLocalStorage from "@/hooks/useGuestFormStorage";

export type FormAction<T> = {
  formValues: T; // needs to be a generic
  method: "POST" | "GET" | "PATCH" | "DELETE";
  // TODO: create and assign routes enum as type
  route: string; // API route if user is signed in
  key: "sightings"; // local storage key if user is not signed in
};

export default function useFormRouter() {
  const { isSignedIn, token } = useContext(AuthContext);
  const { sendReqToLocalStorage } = useLocalStorage();

  // Check auth status and route request to server or local storage
  //! Function must provide a return value if useApi returns an error
  function checkAuthAndSubmit<T>({
    formValues,
    method,
    route,
    key,
  }: FormAction<T>) {
    if (!isSignedIn) {
      sendReqToLocalStorage({ formValues, method, key });
    }
  }

  // If `isSignedIn` send data via async action in `useApi` hook
  // accepts form data, request method, and server route as params
  // performs appropriate async action using fetch API
  // sends token with request as required

  return { checkAuthAndSubmit };
}
