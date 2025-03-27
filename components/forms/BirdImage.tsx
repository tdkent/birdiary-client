import { useEffect, useState } from "react";
import Image from "next/image";
import { BASE_URL } from "@/constants/env";
import birdNames from "@/data/birds";
import { Bird } from "@/types/models";
import {
  ErrorMessages,
  type QuerySuccess,
  type ExpectedServerError,
} from "@/types/api";

type BirdImageProps = {
  currBirdName: string;
};

export default function BirdImage({ currBirdName }: BirdImageProps) {
  const [data, setData] = useState<Bird>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currFetchedBird, setCurrFetchedBird] = useState<string | null>(null);

  useEffect(() => {
    const getBird = async () => {
      setPending(true);
      setError(null);
      setCurrFetchedBird(currBirdName);
      try {
        const response = await fetch(BASE_URL + "/birds/" + currBirdName);
        const result: QuerySuccess<Bird> | ExpectedServerError =
          await response.json();

        if ("error" in result) {
          const msg = Array.isArray(result.message)
            ? result.message.join(",")
            : result.message;
          throw new Error(`${result.error}: ${msg}`);
        }

        setData(result.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(ErrorMessages.Default);
        }
      } finally {
        setPending(false);
      }
    };
    // Delay call to check user has stopped typing
    // Do not send request if bird is already fetched
    if (birdNames.includes(currBirdName) && currFetchedBird !== currBirdName) {
      setTimeout(() => getBird(), 500);
    }
  }, [currFetchedBird, currBirdName]);

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
        <Image src={data.imgUrl} alt={data.commName} width={300} height={225} />
        <figcaption className="text-xs">{data.imgAttr}</figcaption>
      </figure>
    </>
  );
}
