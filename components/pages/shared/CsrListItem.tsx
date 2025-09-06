import type {
  BirdWithCount,
  Group,
  ListVariant,
  LocationWithSightingsCount,
  SightingInStorage,
  SightingWithLocation,
} from "@/models/display";
import type { SightingWithBird } from "@/models/display";
import CsrListItemDetails from "@/components/pages/shared/CsrListItemDetails";
import { createLocaleString, createRelativeDate } from "@/helpers/dates";

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
      const sighting = item as SightingWithLocation;

      return (
        <CsrListItemDetails
          variant="card"
          hybrid="birdDetail"
          sighting={sighting}
        />
      );
    }

    case "diaryDetail": {
      const sighting = item as SightingWithLocation;
      return (
        <CsrListItemDetails
          variant="card"
          hybrid="diaryDetail"
          sighting={sighting}
        />
      );
    }

    default:
      throw new Error("Invalid variant");
  }
}
