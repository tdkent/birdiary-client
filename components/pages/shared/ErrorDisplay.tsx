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
      <div className="my-8 flex flex-col gap-6 rounded-md border border-destructive p-4">
        <p className="flex items-center gap-2 text-xl font-semibold text-destructive">
          <CircleAlert />
          An error occurred
        </p>
        <div className="overflow-auto p-2 py-6">
          <p className="text-base">{msg}</p>
        </div>
        {showReloadBtn && (
          <Button variant="outline" size="lg" onClick={reload}>
            Try again
          </Button>
        )}
      </div>
    </>
  );
}
