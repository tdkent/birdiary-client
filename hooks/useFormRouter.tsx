import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import useLocalStorage from "@/hooks/useGuestFormStorage";
import useApiFormSubmit from "@/hooks/useApiFormSubmit";

// `formValues` is a generic type <T>
// The type of <T> must be explicity declared when the function is called
export type FormAction<T> = {
  formValues: T;
  method: "POST" | "GET" | "PATCH" | "DELETE";
  // TODO: assign routes object as type
  route: string; // API route if user is signed in
  key: "sightings"; // local storage key if user is not signed in
};

// Check user's auth status route form action to appropriate hook
export default function useFormRouter() {
  const [isPending, setIsPending] = useState(false);
  const { isSignedIn, token } = useContext(AuthContext);
  const { sendReqToLocalStorage } = useLocalStorage();
  const { sendReqToServer } = useApiFormSubmit();

  // Check auth status and route request to server or local storage
  function checkAuthAndSubmit<T>({
    formValues,
    method,
    route,
    key,
  }: FormAction<T>) {
    if (!isSignedIn) {
      sendReqToLocalStorage({ formValues, method, key });
    } else {
      return sendReqToServer({ formValues, method, route, token });
    }
  }

  return { isPending, setIsPending, checkAuthAndSubmit };
}
