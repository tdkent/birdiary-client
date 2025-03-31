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
      <div className="flex flex-col gap-6 border rounded-md p-4 my-8">
        <p className="flex items-center gap-2 text-xl">
          <CircleAlert />
          An error occurred
        </p>
        <p className="text-sm">{msg}</p>
        {showReloadBtn && <Button onClick={reload}>Reload page</Button>}
      </div>
    </>
  );
}
