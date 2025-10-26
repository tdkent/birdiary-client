import { getUserStats } from "@/actions/profile";
import StaticBirdImage from "@/components/image/StaticBirdImage";
import DescriptionListItem from "@/components/pages/shared/DescriptionListItem";
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
      newestLifeListSighting: { commonName, date },
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
        <h3>Sightings</h3>
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
        <h3>Favorite Bird</h3>
        <StaticBirdImage
          bird={bird}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 85vw, 678px"
        />
        <dl className="my-4 flex flex-col gap-8 md:gap-12">
          <DescriptionListItem
            dt="Common Name"
            dd={bird.commonName}
            linkHref={`/birds/${bird.id}`}
            linkText="View bird"
          />
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
        <h3>Favorites</h3>
        <dl className="my-4 flex flex-col gap-8 md:gap-12">
          <DescriptionListItem
            dt="Most-Sighted Birds"
            dd={topThreeBirds.map(({ birdId, commonName, count }, idx) => {
              return (
                <li className="flex items-center gap-1" key={birdId}>
                  {idx + 1}. {commonName} ({count})
                </li>
              );
            })}
            useList
          />
          <DescriptionListItem
            dt="Most-Sighted Bird Families"
            dd={topThreeFamilies.map(({ count, family }, idx) => {
              return (
                <li className="flex items-center gap-1" key={family}>
                  {idx + 1}. {family} ({count})
                </li>
              );
            })}
            useList
          />
          <DescriptionListItem
            dt="Days with Most Sightings"
            dd={topThreeDates.map(({ count, date }, idx) => {
              return (
                <li className="flex items-center gap-1" key={date}>
                  {idx + 1}. {createLocaleString(date, "med")} ({count})
                </li>
              );
            })}
            useList
          />
          <DescriptionListItem
            dt="Locations with Most Sightings"
            dd={topThreeLocations.map(({ count, locationId, name }, idx) => {
              return (
                <li className="flex items-center gap-1" key={locationId}>
                  {idx + 1}. {name} ({count})
                </li>
              );
            })}
            useList
          />
        </dl>
      </section>
    </>
  );
}
