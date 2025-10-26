import { getUserStats } from "@/actions/profile";
import StaticBirdImage from "@/components/image/StaticBirdImage";
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
      newestFavSighting,
      oldestFavSighting,
      oldestSighting,
      newestLifeListSighting: { birdId, commonName, date },
      topThreeBirds,
      topThreeDates,
      topThreeFamilies,
      topThreeLocations,
    },
    user: { bird },
  } = result;

  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%]">
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
            dt="First Sighting"
            dd={createLocaleString(oldestSighting, "med")}
          />
          <DescriptionListItem
            dt="Latest Sighting"
            dd={createLocaleString(newestSighting, "med")}
          />
          <DescriptionListItem
            dt="Latest Life List Sighting"
            dd={`${createLocaleString(date, "med")} (${commonName})`}
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
      <section className="flex flex-col gap-4 md:w-[85%]">
        <h3>Your Favorite Bird</h3>
        <StaticBirdImage
          bird={bird}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 85vw, 678px"
        />
        <dl className="my-4 flex flex-col gap-8 md:gap-12">
          <DescriptionListItem dt="Common Name" dd={bird.commonName} />
          <DescriptionListItem
            dt="Count of Sightings"
            dd={countOfFavBirdSightings}
          />
          <DescriptionListItem
            dt="First Sighting"
            dd={createLocaleString(oldestFavSighting, "med")}
          />
          <DescriptionListItem
            dt="Latest Sighting"
            dd={createLocaleString(newestFavSighting, "med")}
          />
        </dl>
      </section>
      <Separator className="mx-auto w-4/5" />
      <section className="flex flex-col gap-4 md:w-[85%]">
        <h3>Your Top 3&apos;s</h3>
        <div>
          <h4>Most-Sighted birds</h4>
          <ol></ol>
        </div>
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
