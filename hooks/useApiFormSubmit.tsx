import type { FormAction } from "@/hooks/useFormRouter";

// Omit "key" property from FormAction type
type ApiRequest<T> = Omit<FormAction<T>, "key">;

// Define generic fetch function to perform async form actions
export default function useApiFormSubmit<T>({
  formValues,
  method,
  route,
}: ApiRequest<T>) {
  function sendReqToServer() {}
  return { sendReqToServer };
}
