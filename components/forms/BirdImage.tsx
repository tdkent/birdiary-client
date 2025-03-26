import { useEffect, useState } from "react";
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
  isMatching: boolean;
};

export default function BirdImage({
  currBirdName,
  isMatching,
}: BirdImageProps) {
  const [data, setData] = useState<Bird>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBird = async () => {
      setPending(true);
      setError(null);
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
    if (birdNames.includes(currBirdName)) {
      setTimeout(() => getBird(), 500);
    }
  }, [isMatching, currBirdName]);

  if (pending) {
    return <p>Fetching bird...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <figure>{data?.commName}</figure>
    </>
  );
}
