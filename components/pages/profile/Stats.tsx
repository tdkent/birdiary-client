import { serverApiRequest } from "@/actions/api.actions";
import StaticBirdImage from "@/components/image/StaticBirdImage";
import DescriptionListItem from "@/components/pages/shared/DescriptionListItem";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Separator } from "@/components/ui/separator";
import { createLocaleString } from "@/helpers/dates";
import type { ApiResponse } from "@/types/api.types";
import type { UserSightingStats } from "@/types/user.types";
import Link from "next/link";

export default async function Stats() {
  const result: ApiResponse<UserSightingStats> = await serverApiRequest({
    route: "/users/stats",
  });

  if (result.error) {
    return <ErrorDisplay msg={result.message} />;
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
      newestLifeListSighting,
      topThreeBirds,
      topThreeDates,
      topThreeFamilies,
      topThreeLocations,
    },
    user: { bird },
  } = result.data;

  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%]">
        <h2>All Sightings</h2>
        <dl className="my-4 flex flex-col gap-8 md:gap-12">
          <DescriptionListItem
            dt="Total Sightings Count"
            dd={countOfAllSightings || "0"}
          />
          <DescriptionListItem
            dt="Life List Count"
            dd={countOfLifeListSightings || "0"}
          />
          <DescriptionListItem
            dt="First Sighting"
            dd={oldestSighting && createLocaleString(oldestSighting, "med")}
          />
          <DescriptionListItem
            dt="Latest Sighting"
            dd={newestSighting && createLocaleString(newestSighting, "med")}
          />
          <DescriptionListItem
            dt="Latest Life List Sighting"
            dd={
              newestLifeListSighting &&
              `${createLocaleString(newestLifeListSighting.date, "med")} (${newestLifeListSighting.commonName})`
            }
          />
          <DescriptionListItem
            dt="Sightings of Common Species"
            dd={countOfCommonSightings || "0"}
          />
          <DescriptionListItem
            dt="Sightings of Uncommon Species"
            dd={countOfUncommonSightings || "0"}
          />
          <DescriptionListItem
            dt="Sightings of Rare Species"
            dd={countOfRareSightings || "0"}
          />
          <DescriptionListItem
            dt="Sightings w/o Location"
            dd={countOfSightingsWithoutLocation || "0"}
          />
          <p className="text-sm">
            Note: Species occurrences are based on the American Birding
            Association (ABA) Checklist.{" "}
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
        <h2 className="mb-4">My Favorite Bird</h2>
        {bird ? (
          <>
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
                dd={countOfFavBirdSightings || "0"}
              />
              <DescriptionListItem
                dt="First Sighting"
                dd={
                  oldestFavSighting &&
                  createLocaleString(oldestFavSighting, "med")
                }
              />
              <DescriptionListItem
                dt="Latest Sighting"
                dd={
                  newestFavSighting &&
                  createLocaleString(newestFavSighting, "med")
                }
              />
            </dl>
          </>
        ) : (
          <>
            <p className="mt-4 text-base italic">
              You do not have a favorite bird.
            </p>
          </>
        )}
      </section>
      <Separator className="mx-auto w-4/5" />
      <section className="flex flex-col gap-4 md:w-[85%]">
        <h2>My Favorites</h2>
        <dl className="my-4 flex flex-col gap-8 md:gap-12">
          <DescriptionListItem
            dt="Most-Sighted Birds"
            dd={
              topThreeBirds &&
              topThreeBirds.map(({ birdId, commonName, count }, idx) => {
                return (
                  <li className="flex items-center gap-1" key={birdId}>
                    {idx + 1}. {commonName} ({count})
                  </li>
                );
              })
            }
            useList
          />
          <DescriptionListItem
            dt="Most-Sighted Bird Families"
            dd={
              topThreeFamilies &&
              topThreeFamilies.map(({ count, family }, idx) => {
                return (
                  <li className="flex items-center gap-1" key={family}>
                    {idx + 1}. {family} ({count})
                  </li>
                );
              })
            }
            useList
          />
          <DescriptionListItem
            dt="Days with Most Sightings"
            dd={
              topThreeDates &&
              topThreeDates.map(({ count, date }, idx) => {
                return (
                  <li className="flex items-center gap-1" key={date}>
                    {idx + 1}. {createLocaleString(date, "med")} ({count})
                  </li>
                );
              })
            }
            useList
          />
          <DescriptionListItem
            dt="Locations with Most Sightings"
            dd={
              topThreeLocations &&
              topThreeLocations
                .filter(({ name }) => name)
                .map(({ count, locationId, name }, idx) => {
                  return (
                    <li className="flex items-center gap-1" key={locationId}>
                      {idx + 1}. {name} ({count})
                    </li>
                  );
                })
            }
            useList
          />
        </dl>
      </section>
    </>
  );
}
