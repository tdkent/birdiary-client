import { Skeleton } from "@/components/ui/skeleton";

type PendingProps = {
  variant:
    | "account"
    | "bird"
    | "card"
    | "cardWithControls"
    | "listDoubleRowWithControls"
    | "listSingleRow"
    | "listDoubleRow"
    | "location"
    | "profile"
    | "profileForm";
  listSize?: number;
};

/** Loading UI that renders while async actions are pending. */
export default function Pending({ variant, listSize }: PendingProps) {
  switch (variant) {
    case "account": {
      return (
        <>
          <div className="mb-4 mt-8 flex flex-col gap-4">
            <Skeleton className="h-6 w-3/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-3/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </>
      );
    }

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

    case "location": {
      return (
        <>
          <div className="mb-4 mt-8 flex flex-col gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </>
      );
    }

    case "profile": {
      return (
        <>
          <div className="mb-4 mt-8 flex flex-col gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </>
      );
    }

    case "profileForm": {
      return (
        <>
          <div className="mb-4 mt-8 flex flex-col gap-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </>
      );
    }

    default:
      throw new Error("Invalid variant");
  }
}
