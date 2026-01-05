import { getUser } from "@/actions/api.actions";
import DeleteAccount from "@/components/pages/profile/DeleteAccount";
import ExportCsv from "@/components/pages/profile/ExportCsv";
import TransferStorageData from "@/components/pages/profile/TransferStorageData";
import DescriptionListItem from "@/components/pages/shared/DescriptionListItem";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createLocaleString } from "@/helpers/date.helpers";
import Link from "next/link";

/** Fetch and display user's profile and account data */
export default async function Profile() {
  const result = await getUser();

  if (result.error) {
    return <ErrorDisplay msg={result.message} />;
  }

  const {
    address,
    bio,
    bird,
    count: { countOfAllSightings, countOfLifeListSightings },
    createdAt,
    email,
    name,
  } = result.data;

  const accountCreatedDate = createLocaleString(createdAt, "med");

  return (
    <>
      <div className="flex flex-col gap-16 md:w-[85%]">
        <section className="flex flex-col gap-4">
          <h2 className="font-heading">My Info</h2>
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
          <h2>Sightings Data</h2>
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
          <ExportCsv />
        </section>
        <Separator className="mx-auto w-4/5" />
        <section className="flex flex-col gap-4">
          <h2>Account Details</h2>
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
