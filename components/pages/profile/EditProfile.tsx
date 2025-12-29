import EditProfileForm from "@/components/forms/EditProfileForm";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/helpers/auth";
import { apiRoutes } from "@/models/api";
import type { ApiResponse } from "@/types/api.types";
import type { UserWithCountAndBird } from "@/types/user.types";
import Link from "next/link";

/** Fetch user data and display form. */
export default async function EditProfile() {
  const token = await getCookie();

  const response = await fetch(apiRoutes.user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result: ApiResponse<UserWithCountAndBird> = await response.json();

  if (result.error) {
    return <ErrorDisplay msg={result.message} />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <EditProfileForm user={result.data} />
        <Button asChild size="lg" variant="secondary">
          <Link href="/profile">Cancel</Link>
        </Button>
      </div>
    </>
  );
}
