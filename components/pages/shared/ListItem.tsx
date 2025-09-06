import type {
  SightingWithLocation,
  SightingWithBird,
  SightingInStorage,
  BirdWithCount,
  ListVariant,
  Group,
  LocationWithSightingsCount,
} from "@/models/display";
import ListItemDetails from "@/components/pages/shared/ListItemDetails";
import CardItem from "@/components/pages/shared/CardItem";
import { createLocaleString } from "@/helpers/dates";
import { formatBirdNameToUrl } from "@/helpers/data";

type ListItemProps = {
  variant: ListVariant;
  item:
    | BirdWithCount
    | Group
    | LocationWithSightingsCount
    | SightingWithBird
    | SightingWithLocation
    | SightingInStorage;
};

/** SSR component that renders a single item in List */
export default function ListItem({ variant, item }: ListItemProps) {
  switch (variant) {
    case "birdpedia": {
      const { commonName, id, scientificName } = item as BirdWithCount;
      return (
        <ListItemDetails
          href={`/birds/${id}`}
          text={commonName}
          subtext={scientificName}
        />
      );
    }

    case "lifelistSighting": {
      const {
        bird: { commonName },
        date,
      } = item as SightingWithBird;
      return (
        <ListItemDetails
          href={`/birds/${formatBirdNameToUrl(commonName)}`}
          text={commonName}
          subtext={createLocaleString(date, "med")}
        />
      );
    }

    case "location": {
      const { id, count, name } = item as LocationWithSightingsCount;
      const href = `/locations/${id} ${name}`;
      const sightingCount = count && count > 0 ? count : null;
      const sightingText = sightingCount
        ? `${sightingCount} sighting${sightingCount > 1 ? "s" : ""}`
        : "No sightings yet!";
      return <ListItemDetails href={href} text={name} subtext={sightingText} />;
    }

    case "locationDetail": {
      const sighting = item as SightingWithBird;
      return <CardItem sighting={sighting} />;
    }

    default:
      throw new Error("Invalid variant");
  }
}
