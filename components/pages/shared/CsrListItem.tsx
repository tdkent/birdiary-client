import type {
  GroupByDate,
  ListItem,
  ListVariant,
  Sighting,
  SightingWithLocation,
} from "@/types/models";
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
      const { date, count } = item as Extract<ListItem, GroupByDate>;

      return (
        <CsrListItemDetails
          variant="list"
          href={"/diary/" + date.slice(0, 10)}
          text={createLocaleString(date, "med")}
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
