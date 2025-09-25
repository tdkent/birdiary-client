import BirdImage from "@/components/forms/BirdImage";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRoutes, ExpectedServerError } from "@/models/api";
import { Bird } from "@/models/db";
import Link from "next/link";

/** Bird display updated daily. */
export default async function BirdOfTheDay() {
  const response = await fetch(apiRoutes.birdOfTheDay);
  const result: Bird | ExpectedServerError = await response.json();
  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }
  return (
    <>
      <section className="my-4">
        <Link className="group" href={`/birds/${result.id}`}>
          <Card className="group-hover:list-hover w-full hover:scale-[1.025]">
            <CardHeader>
              <CardTitle>
                <h3 className="font-playful text-3xl md:text-4xl">
                  Bird of the Day
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5">
              <BirdImage
                currBirdName={result.commonName}
                sizes="(max-width: 1024px) 100vw, 780px"
              />
              <h4 className="text-xl md:text-2xl">{result.commonName}</h4>
            </CardContent>
          </Card>
        </Link>
      </section>
    </>
  );
}
