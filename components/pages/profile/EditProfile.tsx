import EditProfileForm from "@/components/forms/EditProfileForm";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/helpers/auth";
import type { ExpectedServerError } from "@/models/api";
import { apiRoutes } from "@/models/api";
import { UserProfile } from "@/models/display";
import Link from "next/link";

/** Fetch user data and display form. */
export default async function EditProfile() {
  const token = await getCookie();

  const response = await fetch(apiRoutes.user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result: UserProfile | ExpectedServerError = await response.json();

  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <EditProfileForm user={result} />
        <Button asChild size="lg" variant="secondary">
          <Link href="/profile">Cancel</Link>
        </Button>
      </div>
    </>
  );
}
