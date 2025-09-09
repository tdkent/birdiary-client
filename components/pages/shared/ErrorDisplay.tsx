import { CircleAlert } from "lucide-react";

type ErrorDisplayProps = {
  statusCode?: number;
};

/** Show error information and optional reload button */
export default function ErrorDisplay({ statusCode }: ErrorDisplayProps) {
  let errorMessage = "";
  switch (statusCode) {
    case 400: {
      errorMessage = "Invalid request.";
      break;
    }
    case 403: {
      errorMessage =
        "You do not have access to this resource. Please try signing in again.";
      break;
    }
    case 404: {
      errorMessage = "The requested resource could not be found.";
      break;
    }

    default: {
      errorMessage =
        "An unexpected error occurred. Refreshing the page may help, or you can try again later.";
    }
  }

  return (
    <>
      <div className="my-8 flex flex-col gap-2 rounded-md border border-destructive p-4 md:w-[85%]">
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
