import { getUser } from "@/actions/api.actions";
import EditProfileForm from "@/components/forms/EditProfileForm";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/** Fetch user data and display form. */
export default async function EditProfile() {
  const result = await getUser();

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
