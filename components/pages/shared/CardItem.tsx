import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createLocaleString } from "@/helpers/dates";
import { SightingWithBird } from "@/models/display";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";

type CardItemProps = {
  sighting: SightingWithBird;
};

export default function CardItem({ sighting }: CardItemProps) {
  const {
    bird: { commonName },
    description,
    date,
    id,
  } = sighting;
  return (
    <>
      <li className="w-full md:w-[calc(50%-0.5rem)]">
        <Link className="group" href={`/sightings/${id}`}>
          <Card className="group-hover:list-hover w-full pb-2 hover:scale-[1.025]">
            <CardHeader>
              <CardTitle>
                <h3 className="line-clamp-1 text-lg font-semibold md:text-xl">
                  {commonName}
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5">
              <p className={`flex items-center gap-1.5 text-base md:text-lg`}>
                <CalendarIcon strokeWidth={1} size={20} />
                <span className="line-clamp-1">
                  {createLocaleString(date, "med")}
                </span>
              </p>
              <p
                className={`line-clamp-1 text-base md:text-lg ${!description && "italic"}`}
              >
                {description ?? "No description"}
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
