import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createLocaleString } from "@/helpers/dates";
import { SightingWithBird } from "@/models/display";

type CardItemProps = {
  sighting: SightingWithBird;
};

export default function CardItem({ sighting }: CardItemProps) {
  const {
    bird: { commonName },
    description,
    date,
  } = sighting;
  return (
    <>
      <li>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <h3>{commonName}</h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{createLocaleString(date, "full")}</p>
            <p>{description}</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">edit</Button>
          </CardFooter>
        </Card>
      </li>
    </>
  );
}
