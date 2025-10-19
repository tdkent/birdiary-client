import ListItemDetails from "@/components/pages/shared/ListItemDetails";
import ListItemNEW from "@/components/pages/shared/ListItemNEW";
import { createLocaleString } from "@/helpers/dates";
import { Messages } from "@/models/api";
import type {
  BirdWithCount,
  LifeList,
  ListVariant,
  LocationWithSightingsCount,
  SightingWithBird,
} from "@/models/display";

type ListItemProps = {
  variant: Extract<
    ListVariant,
    "birds" | "lifeList" | "locations" | "locationDetail"
  >;
  item:
    | BirdWithCount
    | LifeList
    | LocationWithSightingsCount
    | SightingWithBird;
};

/** SSR component that renders a single item in List */
export default function ListItem({ variant, item }: ListItemProps) {
  switch (variant) {
    case "birds": {
      const { commonName, count, id, imgSecureUrl, scientificName } =
        item as BirdWithCount;
      return (
        <ListItemNEW
          commonName={commonName}
          count={count}
          href={`/birds/${id}`}
          iconVariant="single"
          imgSecureUrl={imgSecureUrl}
          mainText={commonName}
          id={id}
          subText={scientificName}
          variant={variant}
        />
      );
    }

    case "lifeList": {
      const { birdId, commonName, count, date, imgSecureUrl } =
        item as LifeList;
      return (
        <ListItemNEW
          commonName={commonName}
          count={count}
          href={`/birds/${birdId}`}
          iconVariant="single"
          imgSecureUrl={imgSecureUrl}
          mainText={commonName}
          id={birdId}
          subText={`First observed ${createLocaleString(date, "med")}`}
          variant={variant}
        />
      );
    }

    case "locations": {
      const { id, count, name } = item as LocationWithSightingsCount;
      const href = `/locations/${id}`;
      const sightingCount = count && count > 0 ? count : null;
      const sightingText = sightingCount
        ? `${sightingCount} sighting${sightingCount > 1 ? "s" : ""}`
        : "No sightings yet!";
      return <ListItemDetails href={href} text={name} subtext={sightingText} />;
    }

    case "locationDetail": {
      const sighting = item as SightingWithBird;
      const href = `/sightings/${sighting.id}`;
      return (
        <ListItemDetails
          href={href}
          text={sighting.bird.commonName}
          subtext={createLocaleString(sighting.date, "med")}
        />
      );
    }

    default:
      throw new Error(Messages.InvalidSwitchCase);
  }
}
