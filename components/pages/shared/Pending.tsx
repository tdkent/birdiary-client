import { Skeleton } from "@/components/ui/skeleton";

type PendingProps = {
  variant: "list" | "bird";
  listSize?: number;
};

/** Loading UI that renders while async actions are pending. */
export default function Pending({ variant, listSize }: PendingProps) {
  switch (variant) {
    case "bird": {
      return (
        <>
          <div className="mb-4 mt-8 flex flex-col gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </>
      );
    }

    case "list": {
      return (
        <>
          <div className="mb-4 mt-8 flex flex-col gap-4">
            {new Array(listSize).fill(null).map((_, i) => {
              return <Skeleton key={i} className="h-5 w-full" />;
            })}
          </div>
        </>
      );
    }

    default:
      throw new Error("Invalid variant");
  }
}
