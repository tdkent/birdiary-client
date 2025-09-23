import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { createLocaleString } from "@/helpers/dates";
import type { SightingWithLocation } from "@/models/display";
import { MapPin } from "lucide-react";
import Link from "next/link";

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
  const { isSignedIn } = useAuth();
  switch (variant) {
    case "list": {
      const sightingCount = count && count > 0 ? count : null;
      const countText = sightingCount
        ? `${sightingCount} sighting${sightingCount > 1 ? "s" : ""}`
        : "";
      return (
        <>
          <li className="list-hover hover:scale-[1.025]">
            <Link href={href} className="">
              <div className="flex flex-col px-4 py-4 md:w-full md:flex-row md:justify-between md:gap-16 md:py-6 md:text-xl">
                <span className="line-clamp-1 text-lg font-semibold md:grow md:text-xl">
                  {text}
                </span>
                <span className="text-lg italic md:shrink-0">
                  {subtext ?? countText}
                </span>
              </div>
            </Link>
          </li>
        </>
      );
    }

    case "card": {
      return (
        <>
          <li className="w-full md:w-[calc(50%-0.5rem)]">
            <Link className="group" href={`/sightings/${sighting.id}`}>
              <Card className="group-hover:list-hover pb-2 hover:scale-[1.025] md:p-4">
                <CardHeader>
                  <CardTitle>
                    <h3 className="line-clamp-1 text-lg font-semibold md:text-xl">
                      {hybrid === "diaryDetail"
                        ? sighting.bird.commonName
                        : createLocaleString(sighting.date, "med")}
                    </h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2.5">
                  {isSignedIn && (
                    <p
                      className={`flex items-center gap-1.5 text-base md:text-lg ${!sighting.location && "italic"}`}
                    >
                      <MapPin strokeWidth={1} size={20} />
                      <span className="line-clamp-1">
                        {sighting.location
                          ? sighting.location.name
                          : "No location"}
                      </span>
                    </p>
                  )}
                  <p
                    className={`truncate text-base md:text-lg ${!sighting.description && "italic"}`}
                  >
                    {sighting.description ?? "No description"}
                  </p>
                </CardContent>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs opacity-0 hover:underline group-hover:opacity-100 md:text-sm">
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
