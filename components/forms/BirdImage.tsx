import { useEffect, useState } from "react";
import Image from "next/image";
import { useDebounceCallback } from "usehooks-ts";
import { CircleAlert, Image as ImageIcon } from "lucide-react";
import birdNames from "@/data/birds";
import type { Bird } from "@/models/db";
import { Messages, apiRoutes, ServerResponseWithError } from "@/models/api";
import PendingIcon from "@/components/forms/PendingIcon";

type BirdImageProps = {
  currBirdName: string;
};

export default function BirdImage({ currBirdName }: BirdImageProps) {
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
      const response = await fetch(apiRoutes.bird(birdId));
      const result: Bird | ServerResponseWithError = await response.json();

      if ("error" in result) {
        const msg = Array.isArray(result.message)
          ? result.message.join(",")
          : result.message;
        throw new Error(`${result.error}: ${msg}`);
      }
      setData(result);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(Messages.DefaultError);
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

  if (data && data.imgUrl) {
    return (
      <>
        <figure className="flex flex-col gap-1">
          <div className="relative flex aspect-[5/3] w-full items-center justify-center gap-2 overflow-hidden rounded-md border">
            <Image
              src={data.imgUrl}
              alt={data.commonName}
              fill
              quality={30}
              className="object-cover"
            />
          </div>
          <figcaption className="px-1 text-xs italic">
            {data.scientificName}. &copy; {data.imgAttribute ?? "Public Domain"}
          </figcaption>
        </figure>
      </>
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
            <span className="text-sm">An error occurred.</span>
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
