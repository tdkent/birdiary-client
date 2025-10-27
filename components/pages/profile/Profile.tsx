import DeleteAccount from "@/components/pages/profile/DeleteAccount";
import TransferStorageData from "@/components/pages/profile/TransferStorageData";
import DescriptionListItem from "@/components/pages/shared/DescriptionListItem";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCookie } from "@/helpers/auth";
import { createLocaleString } from "@/helpers/dates";
import { apiRoutes, ServerResponseWithError } from "@/models/api";
import type { UserProfile } from "@/models/display";
import Link from "next/link";

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
    count: { countOfAllSightings, countOfLifeListSightings },
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
            <DescriptionListItem dt="Name" dd={name} />
            <DescriptionListItem dt="Location" dd={address} />
            <DescriptionListItem dt="Bio" dd={bio} />
          </dl>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
        </section>
        <Separator className="mx-auto w-4/5" />
        <section className="flex flex-col gap-4">
          <h3>Sightings Data</h3>
          <dl className="my-4 flex flex-col gap-8 md:gap-12">
            <DescriptionListItem
              dt="Favorite Bird"
              dd={bird && bird.commonName}
            />
            <DescriptionListItem
              dt="Total Sightings Count"
              dd={countOfAllSightings}
            />
            <DescriptionListItem
              dt="Life List Count"
              dd={countOfLifeListSightings}
            />
          </dl>
          <Button asChild variant="secondary" size="lg">
            <Link href="/profile/stats">View All Stats</Link>
          </Button>
          <TransferStorageData />
          <Separator className="mx-auto w-4/5" />
        </section>
        <section className="flex flex-col gap-4">
          <h3>Account Details</h3>
          <dl className="my-4 flex flex-col gap-8 md:gap-12">
            <DescriptionListItem dt="Account Created" dd={accountCreatedDate} />
            <DescriptionListItem dt="Email" dd={email} />
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
