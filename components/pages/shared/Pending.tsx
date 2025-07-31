import { Skeleton } from "@/components/ui/skeleton";

type PendingProps = {
  variant:
    | "bird"
    | "card"
    | "cardWithControls"
    | "listDoubleRowWithControls"
    | "listSingleRow"
    | "listDoubleRow";
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

    case "card": {
      return (
        <>
          <div className="mb-4 mt-8 flex flex-col gap-4">
            {new Array(listSize).fill(null).map((_, i) => {
              return <Skeleton key={i} className="h-48 w-full" />;
            })}
          </div>
        </>
      );
    }

    case "cardWithControls": {
      return (
        <>
          <div className="mb-4 mt-8 flex flex-col gap-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-12 w-full" />
            {new Array(listSize).fill(null).map((_, i) => {
              return <Skeleton key={i} className="h-48 w-full" />;
            })}
          </div>
        </>
      );
    }

    case "listDoubleRow": {
      return (
        <>
          <div className="mb-4 mt-8 flex flex-col gap-6">
            {new Array(listSize).fill(null).map((_, i) => {
              return <Skeleton key={i} className="h-10 w-full" />;
            })}
          </div>
        </>
      );
    }

    case "listDoubleRowWithControls": {
      return (
        <>
          <div className="mb-4 mt-8 flex flex-col gap-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-12 w-full" />
            {new Array(listSize).fill(null).map((_, i) => {
              return <Skeleton key={i} className="h-5 w-full" />;
            })}
          </div>
        </>
      );
    }

    case "listSingleRow": {
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
