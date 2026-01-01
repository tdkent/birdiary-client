import ListItemDetails from "@/components/pages/shared/ListItemDetails";
import { createLocaleString, createRelativeDate } from "@/helpers/date.helpers";
import type { ListVariant } from "@/types/list-sort.types";
import type {
  SightingsDiary,
  SightingWithBird,
  SightingWithBirdAndLocation,
  SightingWithLocation,
} from "@/types/sighting.types";
import { MapPin } from "lucide-react";

type CsrListItemProps = {
  favBirdId?: number | null;
  item: unknown;
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
      const { count, date, id, sightings } = item as SightingsDiary;
      return (
        <>
          <ListItemDetails
            count={count}
            favBirdId={favBirdId}
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
      const locationString = location ? location.name : "No location";

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
      const locationString = location ? location.name : "No location";
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
      throw new Error();
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
