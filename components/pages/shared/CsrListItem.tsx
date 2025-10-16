import CsrListItemDetails from "@/components/pages/shared/CsrListItemDetails";
import ListItemNEW from "@/components/pages/shared/ListItemNEW";
import { createLocaleString, createRelativeDate } from "@/helpers/dates";
import { Messages } from "@/models/api";
import type {
  BirdWithCount,
  Diary,
  Group,
  LifeList,
  ListVariant,
  LocationWithSightingsCount,
  SightingInStorage,
  SightingWithBird,
  SightingWithLocation,
} from "@/models/display";

type CsrListItemProps = {
  item:
    | BirdWithCount
    | Diary
    | Group
    | LifeList
    | LocationWithSightingsCount
    | SightingWithBird
    | SightingWithLocation
    | SightingInStorage;
  variant: ListVariant;
};

export default function CsrListItem({ item, variant }: CsrListItemProps) {
  switch (variant) {
    case "sighting": {
      const {
        bird: { commonName },
        date,
        id,
      } = item as SightingWithBird;
      return (
        <CsrListItemDetails
          href={`/sightings/${id}`}
          text={commonName}
          subtext={createRelativeDate(date)}
        />
      );
    }

    case "diary": {
      const { count, date, dateId, sightings } = item as Diary;
      return (
        <>
          <ListItemNEW
            count={count}
            href={`/diary/${dateId}`}
            mainText={createLocaleString(date, "med")}
            sightings={sightings.slice(0, 3)}
            subText={`${count} sighting${count === 1 ? "" : "s"}`}
          />
        </>
      );
    }

    case "birdDetail": {
      const { id, date, location } = item as SightingWithLocation;
      const locationString = location
        ? location.name
        : Messages.SightingLocationUnknown;
      return (
        <CsrListItemDetails
          href={`/sightings/${id}`}
          text={createLocaleString(date, "med")}
          subtext={locationString}
        />
      );
    }

    case "diaryDetail": {
      const { id, bird, location } = item as SightingWithLocation;
      const locationString = location
        ? location.name
        : Messages.SightingLocationUnknown;
      return (
        <CsrListItemDetails
          href={`/sightings/${id}`}
          text={bird.commonName}
          subtext={locationString}
        />
      );
    }

    default:
      throw new Error(Messages.InvalidSwitchCase);
  }
}
