"use client";

// Returns a generic card component to different
// configurations of sighting data. The component
// will expect a DiaryDetails (rename?) type object
// as a prop. The heading of the card will be either
// the bird name ("/diary/:date") or sighting date ("/birds/:name")
// The content of the card is the location (if any) and notes.
// The card will include an edit buttons

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FetchedSighting } from "@/types/models";
import { createLocaleString } from "@/helpers/dates";

type SightingCardProps = {
  heading: "name" | "date";
  sighting: FetchedSighting;
};

export default function SightingCard({ sighting, heading }: SightingCardProps) {
  const headingText =
    heading === "date"
      ? createLocaleString(sighting.date, "med")
      : sighting.commName;
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <h3>{headingText}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sighting.location && <p>{sighting.location.name}</p>}
          <p>{sighting.desc}</p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost">edit</Button>
        </CardFooter>
      </Card>
    </>
  );
}
