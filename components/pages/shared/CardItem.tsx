import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sighting } from "@/types/models";
import { createLocaleString } from "@/helpers/dates";

type CardItemProps = {
  sighting: Sighting;
};

export default function CardItem({ sighting }: CardItemProps) {
  const { commName, desc, date } = sighting;
  return (
    <>
      <li>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <h3>{commName}</h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{createLocaleString(date, "full")}</p>
            <p>{desc}</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">edit</Button>
          </CardFooter>
        </Card>
      </li>
    </>
  );
}
