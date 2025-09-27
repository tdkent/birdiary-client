import StaticBirdImage from "@/components/image/StaticBirdImage";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRoutes, ExpectedServerError } from "@/models/api";
import { Bird } from "@/models/db";
import { Suspense } from "react";

/** Bird display updated daily. */
export default async function BirdOfTheDay() {
  return (
    <>
      <section className="my-4">
        <Card className="group-hover:list-hover w-full hover:scale-[1.025]">
          <CardHeader>
            <CardTitle>
              <h3 className="font-playful text-3xl md:text-4xl">
                Bird of the Day
              </h3>
            </CardTitle>
          </CardHeader>
          <Suspense fallback={<Pending variant="birdOfTheDay" />}>
            <CardContent className="flex flex-col gap-2.5">
              <BirdOfTheDayImage />
            </CardContent>
          </Suspense>
        </Card>
      </section>
    </>
  );
}

async function BirdOfTheDayImage() {
  const response = await fetch(apiRoutes.birdOfTheDay);
  const result: Bird | ExpectedServerError = await response.json();
  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }

  return (
    <>
      <StaticBirdImage bird={result} sizes="(max-width: 1024px) 100vw, 780px" />
      <h4 className="text-xl md:text-2xl">{result.commonName}</h4>
    </>
  );
}
