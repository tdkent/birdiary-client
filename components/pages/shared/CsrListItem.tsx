import type {
  Group,
  ListItem,
  ListVariant,
  SightingWithLocation,
} from "@/models/display";
import type { Sighting } from "@/models/db";
import CsrListItemDetails from "@/components/pages/shared/CsrListItemDetails";
import { createLocaleString, createRelativeDate } from "@/helpers/dates";

type CsrListItemProps = {
  item: ListItem;
  variant: ListVariant;
};

export default function CsrListItem({ item, variant }: CsrListItemProps) {
  switch (variant) {
    case "recentSighting": {
      const { commName, date } = item as Extract<ListItem, Sighting>;

      return (
        <CsrListItemDetails
          variant="list"
          href={"/birds/" + commName.replace(" ", "_")}
          text={commName}
          subtext={createRelativeDate(date)}
        />
      );
    }

    case "diary": {
      const { text, count } = item as Extract<ListItem, Group>;

      return (
        <CsrListItemDetails
          variant="list"
          href={"/diary/" + text.slice(0, 10)}
          text={createLocaleString(text, "med")}
          count={count}
        />
      );
    }

    case "birdDetail": {
      const sighting = item as Extract<ListItem, SightingWithLocation>;

      return (
        <CsrListItemDetails
          variant="card"
          hybrid="birdDetail"
          sighting={sighting}
        />
      );
    }

    case "diaryDetail": {
      const sighting = item as Extract<ListItem, SightingWithLocation>;

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
