import { Messages } from "@/models/api";
import { CircleAlert } from "lucide-react";

type ErrorDisplayProps =
  | {
      authErrorMessage: string;
      showInline?: boolean;
      statusCode?: never;
    }
  | {
      authErrorMessage?: never;
      showInline?: boolean;
      statusCode?: number | string;
    };

/** Show error information and optional reload button */
export default function ErrorDisplay({
  authErrorMessage,
  showInline,
  statusCode,
}: ErrorDisplayProps) {
  let errorMessage: string = Messages.UnknownUnexpectedError;

  if (authErrorMessage) errorMessage = authErrorMessage;
  else {
    const parseStatusCode = Number(statusCode);

    switch (parseStatusCode) {
      case 400: {
        errorMessage = Messages.InvalidRequest;
        break;
      }
      case 401: {
        errorMessage = Messages.InvalidToken;
        break;
      }
      case 403: {
        errorMessage = Messages.ForbiddenError;
        break;
      }
      case 404: {
        errorMessage = Messages.NotFoundError;
        break;
      }
      default:
        break;
    }
  }

  if (showInline) {
    return (
      <>
        <div className="w-full border-b border-destructive px-2 pb-2 md:w-3/4">
          <span className="text-base text-destructive">
            <CircleAlert
              strokeWidth={1.5}
              size={20}
              className="mr-2 inline-flex -translate-y-0.5"
            />
            {errorMessage}
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 border-b-2 border-t-2 border-destructive px-4 py-6 text-destructive md:w-3/4">
        <span className="flex items-center gap-2 text-xl font-semibold md:gap-3 md:text-2xl">
          <CircleAlert className="size-6" strokeWidth={1.5} />
          An error occurred
        </span>
        <p className="mt-4 text-lg md:text-xl">{errorMessage}</p>
      </div>
    </>
  );
}
