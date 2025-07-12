import { useEffect, useState } from "react";
import Image from "next/image";
import { useDebounceCallback } from "usehooks-ts";
import { BASE_URL } from "@/constants/env";
import birdNames from "@/data/birds";
import type { Bird } from "@/models/db";
import {
  Messages,
  type QuerySuccess,
  type ExpectedServerError,
} from "@/models/api";

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
      const response = await fetch(BASE_URL + "/birds/" + currBirdName);
      const result: QuerySuccess | ExpectedServerError = await response.json();

      if ("error" in result) {
        const msg = Array.isArray(result.message)
          ? result.message.join(",")
          : result.message;
        throw new Error(`${result.error}: ${msg}`);
      }

      setData(result.data as Bird);
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

  if (pending) {
    return <p>Fetching bird...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data || !data.imgUrl) {
    return <p>No image to show</p>;
  }

  return (
    <>
      <figure>
        <Image
          src={data.imgUrl}
          alt={data.commonName}
          width={300}
          height={225}
        />
        <figcaption className="text-xs">{data.imgAttr}</figcaption>
      </figure>
    </>
  );
}
