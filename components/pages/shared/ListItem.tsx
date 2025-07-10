import type {
  SightingWithLocation,
  BirdWithCount,
  ListVariant,
  Group,
} from "@/models/display";
import type { Sighting } from "@/models/db";
import ListItemDetails from "@/components/pages/shared/ListItemDetails";
import CardItem from "@/components/pages/shared/CardItem";
import { createLocaleString } from "@/helpers/dates";

type ListItemProps = {
  variant: ListVariant;
  item: Sighting | SightingWithLocation | BirdWithCount | Group;
};

/** SSR component that renders a single item in List */
export default function ListItem({ variant, item }: ListItemProps) {
  switch (variant) {
    case "birdpedia": {
      const { commonName, scientificName, count } = item as BirdWithCount;
      return (
        <ListItemDetails
          href={`/birds/${commonName.replace(" ", "_")}`}
          text={commonName}
          subtext={scientificName}
          count={count}
        />
      );
    }

    case "lifelistSighting": {
      const { commonName, date } = item as Sighting;
      return (
        <ListItemDetails
          href={`/birds/${commonName.replace(" ", "_")}`}
          text={commonName}
          subtext={`First observation: ${createLocaleString(date, "med")}`}
        />
      );
    }

    case "location": {
      const { id, count, text } = item as Group;
      const filterHref = text
        .replaceAll(" ", "-")
        .replaceAll(",", "")
        .replaceAll("_", "");
      const href = `/locations/${filterHref}-${id}`;
      const sightingCount = count && count > 0 ? count : null;
      const sightingText = sightingCount
        ? `${sightingCount} sighting${sightingCount > 1 ? "s" : ""}`
        : "No sightings yet!";
      return <ListItemDetails href={href} text={text} subtext={sightingText} />;
    }

    case "locationDetail": {
      const sighting = item as Sighting;
      return <CardItem sighting={sighting} />;
    }

    default:
      throw new Error("Invalid variant");
  }
}
