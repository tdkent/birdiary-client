"use client";

import { updateFavoriteBird } from "@/actions/profile";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { ExpectedServerError } from "@/models/api";
import { User } from "@/models/db";
import { Heart } from "lucide-react";
import { useState } from "react";

type SelectFavoriteBirdType = {
  birdId: number;
};

export default function SelectFavoriteBird({ birdId }: SelectFavoriteBirdType) {
  const [error, setError] = useState<number | null>(null);
  const handleClick = async () => {
    setError(null);
    const result: User | ExpectedServerError = await updateFavoriteBird(birdId);
    if ("error" in result) {
      return setError(result.statusCode);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        {error && <ErrorDisplay showInline statusCode={error} />}
        <Button
          className="text-base font-normal"
          onClick={handleClick}
          variant="outline"
          size="lg"
        >
          <Heart size={18} strokeWidth={1.5} />
          Set favorite bird
        </Button>
      </div>
    </>
  );
}
