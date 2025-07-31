import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/helpers/auth";
import { decrypt } from "@/lib/session";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { apiRoutes, ServerResponseWithError } from "@/models/api";
import type { UserProfile } from "@/models/display";
import { createLocaleString } from "@/helpers/dates";

/** Fetch and display user's profile data */
export default async function Profile() {
  const token = await getCookie();
  const payload = await decrypt(token);

  if (!payload) {
    return (
      <>
        <ErrorDisplay msg="Invalid session data." />
      </>
    );
  }

  const response = await fetch(apiRoutes.user(payload.id as number), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
    createdAt,
    name,
    address,
    bird,
    count: { totalSightings, totalDistinctSightings },
  } = result;

  const accountCreatedDate = createLocaleString(createdAt, "med");

  return (
    <>
      <div className="flex flex-col gap-8">
        <section>
          <h2>Basic Info</h2>
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
              <dt>Account Created:</dt>
              <dd>{accountCreatedDate}</dd>
            </div>
          </dl>
          <div className="my-4">
            <Button variant="secondary" asChild>
              <Link href="/profile/edit">Edit Profile</Link>
            </Button>
          </div>
        </section>
        <section>
          <h3>{name ? name + "'s" : "Your"} Sighting Stats</h3>
          <dl className="divide-y">
            <div className="flex gap-2.5">
              <dt>Favorite Bird:</dt>
              <dd>{bird ? bird.commonName : "N/A"}</dd>
            </div>
            <div className="flex gap-2.5">
              <dt>Total Sightings: {totalSightings}</dt>
              <dd></dd>
            </div>
            <div className="flex gap-2.5">
              <dt>Total Species: {totalDistinctSightings}</dt>
              <dd></dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}
