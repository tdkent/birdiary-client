import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCookie } from "@/helpers/auth";
import type { ExpectedServerError } from "@/models/api";
import type { UserWithSightingsCount } from "@/models/display";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { BASE_URL } from "@/constants/env";
import { createLocaleString } from "@/helpers/dates";

export default async function UserProfile() {
  const token = await getCookie();

  const response = await fetch(BASE_URL + "/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const profileData: UserWithSightingsCount | ExpectedServerError =
    await response.json();

  // Conditionally render expected server error
  if ("error" in profileData) {
    const msg = Array.isArray(profileData.message)
      ? profileData.message.join(",")
      : profileData.message;

    return (
      <>
        <ErrorDisplay msg={`${profileData.error}: ${msg}`} />
      </>
    );
  }

  const {
    createdAt,
    name,
    locationId,
    favoriteBirdId,
    count: { totalSightings, totalDistinctSightings },
  } = profileData;

  const { commName } = favoriteBird;

  const accountCreatedDate = createLocaleString(createdAt, "med");

  return (
    <>
      <div className="flex flex-col gap-8">
        <section>
          <h2>Basic Info</h2>
          <dl className="divide-y">
            <div className="flex gap-2.5">
              <dt>Name:</dt>
              <dd>{name || "N/A"}</dd>
            </div>
            <div className="flex gap-2.5">
              <dt>Location:</dt>
              <dd>{location || "N/A"}</dd>
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
              <dd>{commName || "N/A"}</dd>
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
