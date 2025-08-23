import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SightingWithLocation } from "@/models/display";
import { createLocaleString } from "@/helpers/dates";

type CsrListItemDetailsProps =
  | {
      variant: "list";
      href: string;
      text: string;
      subtext?: string;
      count?: number;
      sighting?: never;
      hybrid?: never;
    }
  | {
      variant: "card";
      hybrid: "birdDetail" | "diaryDetail";
      sighting: SightingWithLocation;
      href?: never;
      text?: never;
      subtext?: never;
      count?: never;
    };

export default function CsrListItemDetails({
  variant,
  hybrid,
  href,
  text,
  subtext,
  count,
  sighting,
}: CsrListItemDetailsProps) {
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  switch (variant) {
    case "list": {
      const sightingCount = count && count > 0 ? count : null;
      return (
        <>
          <li className="list-hover px-2 py-4">
            <Link href={href}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">{text}</span>
                  {subtext && <span className="text-sm italic">{subtext}</span>}
                </div>
                {sightingCount && (
                  <div>
                    <span className="text-sm">
                      {sightingCount > 1
                        ? `${sightingCount} sightings`
                        : "1 sighting"}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </li>
        </>
      );
    }

    case "card": {
      return (
        <>
          <li>
            <Link className="group" href={`/sightings/${sighting.id}`}>
              <Card className="group-hover:list-hover w-full pb-2 hover:scale-[1.025]">
                <CardHeader>
                  <CardTitle>
                    {hybrid === "diaryDetail" && (
                      <h2 className="line-clamp-1 text-lg font-semibold">
                        {sighting.bird.commonName}
                      </h2>
                    )}
                    {hybrid === "birdDetail" && (
                      <h2>{createLocaleString(sighting.date, "med")}</h2>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2.5">
                  <p
                    className={`flex items-center gap-1.5 text-base ${!sighting.location && "italic"}`}
                  >
                    <MapPin strokeWidth={1} size={20} />
                    <span className="line-clamp-1">
                      {sighting.location
                        ? sighting.location.name
                        : "No location"}
                    </span>
                  </p>
                  <p
                    className={`line-clamp-1 text-base ${!sighting.description && "italic"}`}
                  >
                    {sighting.description ?? "No description"}
                  </p>
                </CardContent>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs opacity-0 hover:underline group-hover:opacity-100">
                  view details
                </span>
              </Card>
            </Link>
          </li>
        </>
      );
    }

    default:
      throw new Error("Invalid variant");
  }
}
