import type {
  Sighting,
  SightingWithLocation,
  SingleBirdWithCount,
  ListVariant,
  GroupedData,
} from "@/types/models";
import ListItemDetails from "@/components/pages/shared/ListItemDetails";
import CardItem from "@/components/pages/shared/CardItem";
import { createLocaleString } from "@/helpers/dates";

type ListItemProps = {
  variant: ListVariant;
  item: Sighting | SightingWithLocation | SingleBirdWithCount | GroupedData;
};

/** SSR component that renders a single item in List */
export default function ListItem({ variant, item }: ListItemProps) {
  switch (variant) {
    case "birdpedia": {
      const { commName, sciName, count } = item as SingleBirdWithCount;
      return (
        <ListItemDetails
          href={`/birds/${commName.replace(" ", "_")}`}
          text={commName}
          subtext={sciName}
          count={count}
        />
      );
    }

    case "lifelistSighting": {
      const { commName, date } = item as Sighting;
      return (
        <ListItemDetails
          href={`/birds/${commName.replace(" ", "_")}`}
          text={commName}
          subtext={`First observation: ${createLocaleString(date, "med")}`}
        />
      );
    }

    case "location": {
      const { id, count, text } = item as GroupedData;
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
