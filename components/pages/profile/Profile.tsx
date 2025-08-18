import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/helpers/auth";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { apiRoutes, ServerResponseWithError } from "@/models/api";
import type { UserProfile } from "@/models/display";
import { createLocaleString } from "@/helpers/dates";
import TransferStorageData from "@/components/pages/profile/TransferStorageData";

/** Fetch and display user's profile and account data */
export default async function Profile() {
  const token = await getCookie();
  if (!token) return <ErrorDisplay msg="Invalid session data." />;

  const response = await fetch(apiRoutes.userProfile, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const result: UserProfile | ServerResponseWithError = await response.json();

  if ("error" in result) {
    const msg = Array.isArray(result.message)
      ? result.message.join(",")
      : result.message;
    return (
      <>
        <ErrorDisplay msg={`${result.error}: ${msg}`} />
      </>
    );
  }

  const {
    address,
    bird,
    count: { totalSightings, totalDistinctSightings },
    createdAt,
    email,
    name,
  } = result;

  const accountCreatedDate = createLocaleString(createdAt, "med");

  return (
    <>
      <div className="flex flex-col">
        <section>
          <h3>Profile Details</h3>
          <dl className="divide-y">
            <div className="flex gap-2.5">
              <dt>Name:</dt>
              <dd>{name ?? "N/A"}</dd>
            </div>
            <div className="flex gap-2.5">
              <dt>Location:</dt>
              <dd>{address ?? "N/A"}</dd>
            </div>
            <div className="flex gap-2.5">
              <dt>Bio:</dt>
              <dd>N/A</dd>
            </div>
          </dl>
          <div className="mt-6">
            <Button variant="outline" asChild>
              <Link href="/profile/edit">Edit Profile</Link>
            </Button>
          </div>
        </section>
        <section>
          <h3>Sightings Data</h3>
          <dl className="divide-y">
            <div className="flex gap-2.5">
              <dt>Favorite Bird:</dt>
              <dd>{bird ? bird.commonName : "N/A"}</dd>
            </div>
            <div className="flex gap-2.5">
              <dt>Total Sightings:</dt>
              <dd>{totalSightings}</dd>
            </div>
            <div className="flex gap-2.5">
              <dt>Life List Species:</dt>
              <dd>{totalDistinctSightings}</dd>
            </div>
          </dl>
          <TransferStorageData />
        </section>
        <section>
          <h3>Account Details</h3>
          <div className="flex gap-2.5">
            <dt>Account Created:</dt>
            <dd>{accountCreatedDate}</dd>
          </div>
          <div className="flex gap-2.5">
            <dt>Email:</dt>
            <dd>{email}</dd>
          </div>
          <div className="mt-6">
            <Button variant="outline" asChild>
              <Link href="/profile/updatepassword">Update Password</Link>
            </Button>
          </div>
          <div className="my-8 rounded-md border border-destructive p-2">
            <h4 className="text-xl font-semibold text-destructive">
              Delete Account
            </h4>
            <p>Permanently delete your account and all sighting data.</p>
            <Button variant="destructive">Delete account</Button>
          </div>
        </section>
      </div>
    </>
  );
}
