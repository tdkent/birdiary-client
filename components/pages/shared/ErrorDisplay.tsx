import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorDisplayProps = {
  msg: string;
  showReloadBtn?: boolean;
};

/** Show error information and optional reload button */
export default function ErrorDisplay({
  msg,
  showReloadBtn,
}: ErrorDisplayProps) {
  const reload = () => location.reload();
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
