import { Skeleton } from "@/components/ui/skeleton";

type PendingProps = {
  variant: "list";
  listSize: number;
};

/** Loading UI that renders while async actions are pending. */
export default function Pending({ variant, listSize }: PendingProps) {
  switch (variant) {
    case "list": {
      return (
        <>
          <div className="mt-8 flex flex-col gap-6">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-14 w-full" />
            <div className="flex flex-col gap-4">
              {new Array(listSize).fill(null).map((_, i) => {
                return <Skeleton key={i} className="h-5 w-full" />;
              })}
            </div>
            <Skeleton className="mx-auto h-12 w-3/4" />
          </div>
        </>
      );
    }

    default:
      throw new Error("Invalid variant");
  }
}
