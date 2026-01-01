import { serverApiRequest } from "@/actions/api.actions";
import SelectFavoriteBird from "@/components/pages/bird/SelectFavoriteBird";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { checkSession } from "@/helpers/auth.helpers";
import type { ApiResponse } from "@/types/api.types";
import type { User } from "@/types/user.types";

type FavoriteBirdProps = {
  birdId: number;
};

export default async function FavoriteBird({ birdId }: FavoriteBirdProps) {
  const hasSession = await checkSession();
  if (!hasSession) return null;

  const result: ApiResponse<User> = await serverApiRequest({
    route: "/users",
  });

  if (result.error) {
    return <ErrorDisplay msg={result.message} />;
  }
  const { favoriteBirdId } = result.data;

  return <SelectFavoriteBird birdId={birdId} favoriteBirdId={favoriteBirdId} />;
}
