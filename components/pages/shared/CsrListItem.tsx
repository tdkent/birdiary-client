import CsrListItemDetails from "@/components/pages/shared/CsrListItemDetails";
import { createLocaleString, createRelativeDate } from "@/helpers/dates";
import { Messages } from "@/models/api";
import type {
  BirdWithCount,
  Group,
  ListVariant,
  LocationWithSightingsCount,
  SightingInStorage,
  SightingWithBird,
  SightingWithLocation,
} from "@/models/display";

type CsrListItemProps = {
  item:
    | BirdWithCount
    | Group
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
          variant="list"
          href={`/sightings/${id}`}
          text={commonName}
          subtext={createRelativeDate(date)}
        />
      );
    }

    case "diary": {
      const { text, count, id } = item as Group;
      return (
        <CsrListItemDetails
          variant="list"
          href={`/diary/${id}`}
          text={createLocaleString(text, "med")}
          count={count}
        />
      );
    }

    case "birdDetail": {
      const { id, date, location } = item as SightingWithLocation;
      const locationString = location
        ? location.name
        : Messages.SightingLocationUnknown;
      return (
        <CsrListItemDetails
          variant="list"
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
          variant="list"
          href={`/sightings/${id}`}
          text={bird.commonName}
          subtext={locationString}
        />
      );
    }

    default:
      throw new Error("Invalid variant");
  }
}
