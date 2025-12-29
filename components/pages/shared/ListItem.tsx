import ListItemDetails from "@/components/pages/shared/ListItemDetails";
import { createLocaleString } from "@/helpers/dates";
import type { ListVariant } from "@/models/display";
import type { Bird, LifeListBird } from "@/types/bird.types";
import type { LocationsList } from "@/types/location.types";
import type { SightingWithBird } from "@/types/sighting.types";

type ListItemProps = {
  favBirdId?: number | null;
  item: unknown;
  searchTerm?: string;
  variant: ListVariant;
};

/** SSR component that renders a single item in List */
export default function ListItem({
  favBirdId,
  item,
  searchTerm,
  variant,
}: ListItemProps) {
  switch (variant) {
    // /birds
    case "birds": {
      const { commonName, count, family, id, imgSecureUrl } = item as Bird;
      return (
        <ListItemDetails
          commonName={commonName}
          count={count}
          href={`/birds/${id}`}
          iconVariant="single"
          imgSecureUrl={imgSecureUrl}
          isFavBird={id === favBirdId}
          mainText={commonName}
          id={id}
          searchTerm={searchTerm}
          subText={family}
          variant={variant}
        />
      );
    }

    // /lifelist
    case "lifeList": {
      const { id, commonName, count, date, imgSecureUrl } =
        item as LifeListBird;
      return (
        <ListItemDetails
          commonName={commonName}
          count={count}
          href={`/birds/${id}`}
          iconVariant="single"
          id={id}
          imgSecureUrl={imgSecureUrl}
          isFavBird={id === favBirdId}
          mainText={commonName}
          subText={`First observed ${createLocaleString(date, "med")}`}
          variant={variant}
        />
      );
    }

    // /locations
    case "locations": {
      const { id, count, name, sightings } = item as LocationsList;
      const href = `/locations/${id}`;
      const sightingText = count
        ? `${count} sighting${count > 1 ? "s" : ""}`
        : "No sightings yet!";
      return (
        <ListItemDetails
          count={count}
          href={href}
          favBirdId={favBirdId}
          iconVariant="multi"
          mainText={name}
          sightings={sightings}
          subText={sightingText}
          variant={variant}
        />
      );
    }

    // locations/:id
    case "locationDetail": {
      const {
        bird: { commonName, id: birdId, imgSecureUrl },
        date,
        id,
        isNew,
      } = item as SightingWithBird;
      return (
        <ListItemDetails
          commonName={commonName}
          href={`/sightings/${id}`}
          isFavBird={birdId === favBirdId}
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
      throw new Error();
  }
}
