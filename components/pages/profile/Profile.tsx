import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCookie } from "@/helpers/auth";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { apiRoutes, ServerResponseWithError } from "@/models/api";
import type { UserProfile } from "@/models/display";
import { createLocaleString } from "@/helpers/dates";
import TransferStorageData from "@/components/pages/profile/TransferStorageData";
import DeleteAccount from "@/components/pages/profile/DeleteAccount";

/** Fetch and display user's profile and account data */
export default async function Profile() {
  const token = await getCookie();

  const response = await fetch(apiRoutes.user, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const result: UserProfile | ServerResponseWithError = await response.json();

  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }

  const {
    address,
    bio,
    bird,
    count: { totalSightings, totalDistinctSightings },
    createdAt,
    email,
    name,
  } = result;

  const accountCreatedDate = createLocaleString(createdAt, "med");

  return (
    <>
      <div className="flex flex-col gap-10 md:w-[85%]">
        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-2xl md:text-3xl">Profile Details</h2>
          <dl className="divide-y md:text-xl">
            <div className="flex gap-2.5 py-2">
              <dt>Name:</dt>
              <dd>{name ?? "N/A"}</dd>
            </div>
            <div className="flex gap-2.5 py-2">
              <dt>Location:</dt>
              <dd>{address ?? "N/A"}</dd>
            </div>
            <div className="flex gap-2.5 py-2">
              <dt>Bio:</dt>
              <dd>{bio ?? "N/A"}</dd>
            </div>
          </dl>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
        </section>
        <Separator className="mx-auto w-4/5" />
        <section className="flex flex-col gap-4">
          <h3>Sightings Data</h3>
          <dl className="divide-y md:text-xl">
            <div className="flex gap-2.5 py-2">
              <dt>Favorite Bird:</dt>
              <dd>{bird ? bird.commonName : "N/A"}</dd>
            </div>
            <div className="flex gap-2.5 py-2">
              <dt>Total Sightings:</dt>
              <dd>{totalSightings}</dd>
            </div>
            <div className="flex gap-2.5 py-2">
              <dt>Life List Species:</dt>
              <dd>{totalDistinctSightings}</dd>
            </div>
          </dl>
          <TransferStorageData />
          <Separator className="mx-auto w-4/5" />
        </section>
        <section className="flex flex-col gap-4">
          <h3>Account Details</h3>
          <dl className="divide-y md:text-xl">
            <div className="flex gap-2.5 py-2">
              <dt>Account Created:</dt>
              <dd>{accountCreatedDate}</dd>
            </div>
            <div className="flex gap-2.5 py-2">
              <dt>Email:</dt>
              <dd>{email}</dd>
            </div>
          </dl>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/profile/updatepassword">Update Password</Link>
          </Button>
          <DeleteAccount />
        </section>
      </div>
    </>
  );
}
