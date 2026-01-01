"use client";

import { serverApiRequest } from "@/actions/api.actions";
import PendingIcon from "@/components/forms/PendingIcon";
import BirdImageDisplay from "@/components/image/BirdImageDisplay";
import birdNames from "@/db/birdNames";
import type { ApiResponse } from "@/types/api.types";
import type { Bird } from "@/types/bird.types";
import { ErrorMessages } from "@/types/error-messages.enum";
import { CircleAlert, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

type BirdImageProps = {
  currBirdName: string;
  sizes: string;
};

export default function BirdImage({ currBirdName, sizes }: BirdImageProps) {
  const [data, setData] = useState<Bird>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currFetchedBird, setCurrFetchedBird] = useState<string | null>(null);

  // Debounce by 500ms to ensure user has stopped typing name
  const debounced = useDebounceCallback(async () => {
    setPending(true);
    setError(null);
    setCurrFetchedBird(currBirdName);
    try {
      const birdId = birdNames.findIndex((name) => name === currBirdName) + 1;
      const result: ApiResponse<Bird> = await serverApiRequest({
        route: `/birds/${birdId}`,
      });

      if (result.error) return setError(result.message);

      setData(result.data);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(ErrorMessages.Unexpected);
      }
    } finally {
      setPending(false);
    }
  }, 500);

  // Call debounced callback if name input matches an accepted bird name
  // and the bird is not the previous bird fetched
  useEffect(() => {
    if (birdNames.includes(currBirdName) && currFetchedBird !== currBirdName) {
      debounced();
    }
  }, [currFetchedBird, currBirdName, debounced]);

  if (data && data.imgSecureUrl) {
    return (
      <BirdImageDisplay bird={data} imgUrl={data.imgSecureUrl} sizes={sizes} />
    );
  }

  return (
    <>
      <div className="relative flex aspect-[5/3] w-full items-center justify-center gap-2 overflow-hidden rounded-md border">
        {pending ? (
          <PendingIcon strokeWidth={1} size={32} />
        ) : error ? (
          <>
            <CircleAlert strokeWidth={1} size={28} />
            <span className="text-sm">{error}</span>
          </>
        ) : !data ? (
          <ImageIcon strokeWidth={1} size={32} />
        ) : (
          <>
            <CircleAlert strokeWidth={1} size={28} />
            <span className="text-sm">No image available</span>
          </>
        )}
      </div>
    </>
  );
}
