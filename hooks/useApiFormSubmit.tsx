import type { FormAction } from "@/hooks/useFormRouter";
import { ErrorMessages } from "@/models/error";

// Omit "key" property from FormAction type
type ApiRequest<T> = Omit<FormAction<T>, "key"> & { token: string };

// Define generic fetch function to perform async form actions
export default function useApiFormSubmit() {
  async function sendReqToServer<T>({
    formValues,
    method,
    route,
    token,
  }: ApiRequest<T>) {
    try {
      const response = await fetch(route, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Do not include request body with "GET" requests
        body: method === "GET" ? null : JSON.stringify(formValues),
      });

      return response.json();
    } catch {
      // Unexpected errors bubble to nearest error boundary
      throw new Error(ErrorMessages.Default);
    }
  }
  return { sendReqToServer };
}
