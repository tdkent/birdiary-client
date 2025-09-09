import { CircleAlert } from "lucide-react";
import { Messages } from "@/models/api";

type ErrorDisplayProps = {
  showInline?: boolean;
  statusCode?: number | string;
};

/** Show error information and optional reload button */
export default function ErrorDisplay({
  showInline,
  statusCode,
}: ErrorDisplayProps) {
  const parseStatusCode = Number(statusCode);
  let errorMessage = "";
  switch (parseStatusCode) {
    case 400: {
      errorMessage = Messages.InvalidRequest;
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

    default: {
      errorMessage = Messages.UnknownUnexpectedError;
    }
  }

  if (showInline) {
    return (
      <>
        <div className="rounded-md border border-destructive p-4 md:w-3/4">
          <span className="text-lg text-destructive">
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
      <div className="my-8 flex flex-col gap-2 rounded-md border border-destructive p-4 md:w-3/4">
        <span className="flex items-center gap-2 text-xl font-semibold text-destructive md:gap-3 md:text-2xl">
          <CircleAlert strokeWidth={1.5} size={28} />
          An error occurred
        </span>
        <dl className="my-8 flex flex-col gap-8 px-2">
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Message
            </dt>
            <dd className="text-xl">{errorMessage}</dd>
          </div>
        </dl>
      </div>
    </>
  );
}
