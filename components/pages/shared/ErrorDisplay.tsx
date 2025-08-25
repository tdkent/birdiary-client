// Render client error information
// Use as an alternate to an error boundary
// Optionally loads a button to reload the page
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorDisplayProps = {
  msg: string;
  showReloadBtn?: boolean;
};

export default function ErrorDisplay({
  msg,
  showReloadBtn,
}: ErrorDisplayProps) {
  const reload = () => location.reload();
  return (
    <>
      <div className="my-8 flex flex-col gap-2 rounded-md border border-destructive p-4">
        <span className="flex items-center gap-2 text-xl font-semibold text-destructive">
          <CircleAlert />
          An error occurred
        </span>
        <dl className="my-8 flex flex-col gap-8 px-2">
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase">Message</dt>
            <dd className="text-xl">{msg}</dd>
          </div>
        </dl>
        {showReloadBtn && (
          <Button variant="outline" size="lg" onClick={reload}>
            Try again
          </Button>
        )}
      </div>
    </>
  );
}
