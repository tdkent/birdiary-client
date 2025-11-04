import ListItemDetails from "@/components/pages/shared/ListItemDetails";
import { createLocaleString } from "@/helpers/dates";
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
  SightingWithLocation,
} from "@/models/display";

type ListItemProps = {
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
  searchTerm?: string;
  variant: Extract<
    ListVariant,
    "birds" | "lifeList" | "locations" | "locationDetail"
  >;
};

/** SSR component that renders a single item in List */
export default function ListItem({ item, searchTerm, variant }: ListItemProps) {
  switch (variant) {
    case "birds": {
      const { commonName, count, family, id, imgSecureUrl } =
        item as BirdWithCount;
      return (
        <ListItemDetails
          commonName={commonName}
          count={count}
          href={`/birds/${id}`}
          iconVariant="single"
          imgSecureUrl={imgSecureUrl}
          mainText={commonName}
          id={id}
          searchTerm={searchTerm}
          subText={family}
          variant={variant}
        />
      );
    }

    case "lifeList": {
      const { id, commonName, count, date, imgSecureUrl } = item as LifeList;
      return (
        <ListItemDetails
          commonName={commonName}
          count={count}
          href={`/birds/${id}`}
          iconVariant="single"
          imgSecureUrl={imgSecureUrl}
          mainText={commonName}
          id={id}
          subText={`First observed ${createLocaleString(date, "med")}`}
          variant={variant}
        />
      );
    }

    case "locations": {
      const { id, count, name, sightings } = item as LocationWithCount;
      const href = `/locations/${id}`;
      const sightingCount = count && count > 0 ? count : null;
      const sightingText = sightingCount
        ? `${sightingCount} sighting${sightingCount > 1 ? "s" : ""}`
        : "No sightings yet!";
      return (
        <ListItemDetails
          count={count}
          href={href}
          iconVariant="multi"
          mainText={name}
          sightings={sightings}
          subText={sightingText}
          variant={variant}
        />
      );
    }

    case "locationDetail": {
      const {
        bird: { commonName, imgSecureUrl },
        date,
        id,
        isNew,
      } = item as SightingWithBird;
      return (
        <ListItemDetails
          commonName={commonName}
          href={`/sightings/${id}`}
          iconVariant="single"
          id={id}
          imgSecureUrl={imgSecureUrl}
          isNew={isNew}
          mainText={commonName}
          subText={createLocaleString(date, "med")}
          variant={variant}
        />
      );
    }

    default:
      throw new Error(Messages.InvalidSwitchCase);
  }
}
