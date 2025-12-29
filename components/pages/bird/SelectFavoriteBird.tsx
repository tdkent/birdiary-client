"use client";

import { updateFavoriteBird } from "@/actions/profile";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import type { ApiResponse } from "@/types/api.types";
import type { User } from "@/types/user.types";
import { Heart } from "lucide-react";
import { useState } from "react";

type SelectFavoriteBirdType = {
  birdId: number;
  favoriteBirdId: number | null;
};

export default function SelectFavoriteBird({
  birdId,
  favoriteBirdId,
}: SelectFavoriteBirdType) {
  const [error, setError] = useState<string | null>(null);

  const isCurrFav = birdId === favoriteBirdId;

  const handleClick = async () => {
    setError(null);
    const newId = isCurrFav ? null : birdId;
    const result: ApiResponse<User> = await updateFavoriteBird(newId);
    if (result.error) {
      return setError(result.message);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        {error && <ErrorDisplay showInline msg={error} />}
        <Button
          className="text-base font-normal"
          onClick={handleClick}
          variant="outline"
          size="lg"
        >
          {isCurrFav ? (
            <>
              <Heart
                className="fill-fuchsia-400 text-fuchsia-300"
                size={18}
                strokeWidth={1.5}
              />
              Your favorite bird
            </>
          ) : (
            <>
              <Heart size={18} strokeWidth={1.5} />
              Set favorite bird
            </>
          )}
        </Button>
      </div>
    </>
  );
}
