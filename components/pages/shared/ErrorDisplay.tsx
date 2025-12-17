import { CircleAlert } from "lucide-react";

type ErrorDisplayProps = {
  msg: string;
  showInline?: boolean;
};

/** Show error information and optional reload button */
export default function ErrorDisplay({ msg, showInline }: ErrorDisplayProps) {
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
            {msg}
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
        <p className="mt-4 text-lg md:text-xl">{msg}</p>
      </div>
    </>
  );
}
