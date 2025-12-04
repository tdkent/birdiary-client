import ListItemDetails from "@/components/pages/shared/ListItemDetails";
import { createLocaleString, createRelativeDate } from "@/helpers/dates";
import { Messages } from "@/models/api";
import type {
  BirdWithCount,
  Diary,
  Group,
  LifeList,
  ListVariant,
  LocationWithCount,
  LocationWithSightingsCount,
  SightingInStorage,
  SightingWithBird,
  SightingWithBirdAndLocation,
  SightingWithLocation,
} from "@/models/display";
import { MapPin } from "lucide-react";

type CsrListItemProps = {
  favBirdId?: number | null;
  item:
    | BirdWithCount
    | LifeList
    | LocationWithCount
    | SightingWithBird
    | SightingWithLocation
    | SightingInStorage
    | Diary
    | Group
    | LocationWithSightingsCount;
  variant: ListVariant;
};

export default function CsrListItem({
  favBirdId,
  item,
  variant,
}: CsrListItemProps) {
  switch (variant) {
    case "sighting": {
      const {
        bird: { commonName, id: birdId, imgSecureUrl },
        date,
        id,
        isNew,
      } = item as SightingWithBird;
      return (
        <>
          <ListItemDetails
            commonName={commonName}
            isFavBird={favBirdId === birdId}
            href={`/sightings/${id}`}
            iconVariant="single"
            imgSecureUrl={imgSecureUrl}
            isNew={isNew}
            mainText={commonName}
            id={id}
            subText={createRelativeDate(date)}
            variant={variant}
          />
        </>
      );
    }

    case "diary": {
      const { count, date, id, sightings } = item as Diary;
      return (
        <>
          <ListItemDetails
            count={count}
            href={`/diary/${id}`}
            iconVariant="multi"
            mainText={createLocaleString(date, "med")}
            sightings={sightings}
            subText={`${count} sighting${count === 1 ? "" : "s"}`}
            variant={variant}
          />
        </>
      );
    }

    case "birdDetail": {
      const { id, date, isNew, location } = item as SightingWithLocation;
      const locationString = location
        ? location.name
        : Messages.SightingLocationUnknown;

      return (
        <>
          <ListItemDetails
            href={`/sightings/${id}`}
            iconVariant="none"
            isNew={isNew}
            mainText={createLocaleString(date, "med")}
            subText={<LocationWithMapPin locationString={locationString} />}
            variant={variant}
          />
        </>
      );
    }

    case "diaryDetail": {
      const {
        id,
        bird: { commonName, id: birdId, imgSecureUrl },
        isNew,
        location,
      } = item as SightingWithBirdAndLocation;
      const locationString = location
        ? location.name
        : Messages.SightingLocationUnknown;
      return (
        <ListItemDetails
          commonName={commonName}
          isFavBird={favBirdId === birdId}
          href={`/sightings/${id}`}
          iconVariant="single"
          imgSecureUrl={imgSecureUrl}
          isNew={isNew}
          mainText={commonName}
          id={id}
          subText={<LocationWithMapPin locationString={locationString} />}
          variant={variant}
        />
      );
    }

    default:
      throw new Error(Messages.InvalidSwitchCase);
  }
}

/** Location string with pin icon. Uses inline-block to properly format line-break rule. */
function LocationWithMapPin({ locationString }: { locationString: string }) {
  return (
    <>
      <MapPin
        className="mr-0.5 inline-block -translate-y-0.5"
        strokeWidth={1.5}
        size={12}
      />
      {locationString}
    </>
  );
}
