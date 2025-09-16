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

  if (!token) {
    return <ErrorDisplay statusCode={403} />;
  }

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
      <Separator className="mx-auto w-4/5" />
      <div className="flex flex-col gap-10 md:w-[85%]">
        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-2xl md:text-3xl">Profile Details</h2>
          <dl className="my-4 flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-semibold uppercase md:text-base">
                Name
              </dt>
              <dd className="break-words text-xl md:text-2xl">
                {name ?? "N/A"}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-semibold uppercase md:text-base">
                Location
              </dt>
              <dd className="text-xl md:text-2xl">{address ?? "N/A"}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-semibold uppercase md:text-base">
                Bio
              </dt>
              <dd className="break-words text-xl md:text-2xl">
                {bio ?? "N/A"}
              </dd>
            </div>
          </dl>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
        </section>
        <Separator className="mx-auto w-4/5" />
        <section className="flex flex-col gap-4">
          <h3>Sightings Data</h3>
          <dl className="my-4 flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-semibold uppercase md:text-base">
                Favorite Bird
              </dt>
              <dd className="break-words text-xl md:text-2xl">
                {bird ? bird.commonName : "N/A"}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-semibold uppercase md:text-base">
                Total Sightings
              </dt>
              <dd className="text-xl md:text-2xl">{totalSightings}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-semibold uppercase md:text-base">
                Life List Species
              </dt>
              <dd className="text-xl md:text-2xl">{totalDistinctSightings}</dd>
            </div>
          </dl>
          <TransferStorageData />
          <Separator className="mx-auto w-4/5" />
        </section>
        <section className="flex flex-col gap-4">
          <h3>Account Details</h3>
          <dl className="my-4 flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-semibold uppercase md:text-base">
                Account Created
              </dt>
              <dd className="text-xl md:text-2xl">{accountCreatedDate}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-semibold uppercase md:text-base">
                Email
              </dt>
              <dd className="break-words text-xl md:text-2xl">{email}</dd>
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
