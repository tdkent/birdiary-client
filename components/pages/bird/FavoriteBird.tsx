import { getUser } from "@/actions/profile";
import SelectFavoriteBird from "@/components/pages/bird/SelectFavoriteBird";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { checkSession } from "@/helpers/auth";
import { ExpectedServerError } from "@/models/api";
import { User } from "@/models/db";

type FavoriteBirdProps = {
  birdId: number;
};

export default async function FavoriteBird({ birdId }: FavoriteBirdProps) {
  const hasSession = await checkSession();
  if (!hasSession) return null;

  const result: User | ExpectedServerError = await getUser();
  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }
  const { favoriteBirdId } = result;

  if (birdId === favoriteBirdId) {
    return (
      <>
        <p>This is your favorite bird</p>
      </>
    );
  }

  return <SelectFavoriteBird />;
}
