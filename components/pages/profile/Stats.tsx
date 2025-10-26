import { getUserStats } from "@/actions/profile";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Separator } from "@/components/ui/separator";
import { createLocaleString } from "@/helpers/dates";
import { ExpectedServerError } from "@/models/api";
import { UserStats } from "@/models/display";
import Link from "next/link";

export default async function Stats() {
  const result: UserStats | ExpectedServerError = await getUserStats();

  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }

  const {
    stats: {
      countOfAllSightings,
      countOfCommonSightings,
      countOfUncommonSightings,
      countOfRareSightings,
      countOfLifeListSightings,
      countOfSightingsWithoutLocation,
      countOfFavBirdSightings,
      newestSighting,
      oldestSighting,
    },
    user,
  } = result;

  return (
    <>
      <section className="flex flex-col gap-4">
        <h3>Basic Stats</h3>
        <dl className="my-4 flex flex-col gap-8 md:gap-12">
          <DescriptionListItem
            dt="Total Sightings Count"
            dd={countOfAllSightings}
          />
          <DescriptionListItem
            dt="Life List Count"
            dd={countOfLifeListSightings}
          />
          <DescriptionListItem
            dt="Date of Your First Sighting"
            dd={createLocaleString(oldestSighting, "med")}
          />
          <DescriptionListItem
            dt="Date of Your Latest Sighting"
            dd={createLocaleString(newestSighting, "med")}
          />
          <DescriptionListItem
            dt="Sightings of Common Species"
            dd={countOfCommonSightings}
          />
          <DescriptionListItem
            dt="Sightings of Uncommon Species"
            dd={countOfUncommonSightings}
          />
          <DescriptionListItem
            dt="Sightings of Rare Species"
            dd={countOfRareSightings}
          />
          <DescriptionListItem
            dt="Sightings w/o Location"
            dd={countOfSightingsWithoutLocation}
          />
          <p className="text-sm">
            Note: Species rarities are based on the American Birding Association
            (ABA) Checklist.{" "}
            <Link
              className="link-inline"
              href="https://www.aba.org/aba-checklist"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              Learn more
            </Link>
          </p>
        </dl>
      </section>
      <Separator className="mx-auto w-4/5" />
      <section className="flex flex-col gap-4">
        <h3>Your Favorite Bird</h3>
        <dl className="my-4 flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Total Sightings
            </dt>
            <dd className="text-xl md:text-2xl">{countOfAllSightings}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Life List Species
            </dt>
            <dd className="text-xl md:text-2xl">{countOfLifeListSightings}</dd>
          </div>
        </dl>
        <Separator className="mx-auto w-4/5" />
      </section>
    </>
  );
}

type DescriptionListItemProps = {
  dt: string;
  dd: number | string;
};

function DescriptionListItem({ dt, dd }: DescriptionListItemProps) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <dt className="text-sm font-semibold uppercase md:text-base">{dt}</dt>
        <dd className="text-xl md:text-2xl">{dd}</dd>
      </div>
    </>
  );
}
