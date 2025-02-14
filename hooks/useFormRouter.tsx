import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import useLocalStorage from "@/hooks/useGuestFormStorage";
import useApiFormSubmit from "@/hooks/useApiFormSubmit";

/* 
• `formValues` is a generic type <T>.
• The type of <T> must be declared when the function is called.
• `route` is the API route used when the user is signed in.
• `key` is the local storage key when the user is not signed in.
*/
export type FormAction<T = object> = {
  formValues: T;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  route: string;
  key: "sightings";
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
      return sendReqToLocalStorage({ formValues, method, key });
    } else {
      // Wait to retrieve token before sending request
      if (token) return sendReqToServer({ formValues, method, route, token });
    }
  }

  return { isPending, setIsPending, checkAuthAndSubmit };
}
