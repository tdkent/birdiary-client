import { Skeleton } from "@/components/ui/skeleton";

type PendingProps = {
  variant:
    | "account"
    | "bird"
    | "cardWithControls"
    | "detailsList"
    | "list"
    | "listDoubleRowWithControls"
    | "listSingleRow"
    | "listDoubleRow"
    | "location"
    | "profile"
    | "profileForm"
    | "sighting"
    | "sightingDetails"
    | "sightingForm";
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

    case "detailsList": {
      return (
        <>
          <div className="my-8 flex flex-col gap-4 md:flex-row md:flex-wrap">
            {new Array(listSize).fill(null).map((_, i) => {
              return (
                <Skeleton
                  key={i}
                  className="h-32 w-full md:h-44 md:w-[calc(50%-0.5rem)]"
                />
              );
            })}
          </div>
          <PaginationControlSkeleton />
        </>
      );
    }

    case "list": {
      return (
        <>
          <div className="my-8 flex flex-col gap-2">
            {new Array(listSize).fill(null).map((_, i) => {
              return <Skeleton key={i} className="h-20 w-full" />;
            })}
          </div>
          <PaginationControlSkeleton />
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

    case "sightingDetails": {
      return (
        <>
          <BirdImageSkeleton />
          <div className="my-2 flex flex-col gap-8">
            <DescriptionListItemSkeleton />
            <DescriptionListItemSkeleton />
            <DescriptionListItemSkeleton />
            <DescriptionListItemSkeleton />
          </div>
          <div className="flex flex-col gap-4">
            <ButtonSkeleton />
            <ButtonSkeleton />
          </div>
        </>
      );
    }

    case "sightingForm": {
      return (
        <>
          <div className="my-4 flex w-full flex-col gap-12 md:w-3/4">
            <FormInputSkeleton />
            <FormInputSkeleton />
            <FormInputSkeleton />
            <FormTextareaSkeleton />
            <div className="flex flex-col gap-2.5">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="aspect-[5/3] w-full" />
            </div>
            <div className="flex flex-col gap-4">
              <ButtonSkeleton />
              <ButtonSkeleton />
            </div>
          </div>
        </>
      );
    }

    default:
      throw new Error("Invalid variant");
  }
}

function BirdImageSkeleton() {
  return <Skeleton className="aspect-[5/3] w-[85%] max-md:w-full" />;
}

function ButtonSkeleton() {
  return <Skeleton className="h-14 w-36 md:h-16" />;
}

function DescriptionListItemSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    </>
  );
}

function FormInputSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-12 w-full md:h-14" />
      </div>
    </>
  );
}

function FormTextareaSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-36 w-full" />
      </div>
    </>
  );
}

function PaginationControlSkeleton() {
  return <Skeleton className="mx-auto h-12 w-1/2 max-sm:w-full" />;
}
