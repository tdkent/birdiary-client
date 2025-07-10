import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sighting } from "@/models/db";
import { createLocaleString } from "@/helpers/dates";

type CardItemProps = {
  sighting: Sighting;
};

export default function CardItem({ sighting }: CardItemProps) {
  const { commonName, description, date } = sighting;
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
