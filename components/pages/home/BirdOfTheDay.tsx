import StaticBirdImage from "@/components/image/StaticBirdImage";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRoutes } from "@/models/api";
import { Bird } from "@/models/db";
import type { ApiResponse } from "@/types/api.types";
import Link from "next/link";
import { Suspense } from "react";

/** Bird display updated daily. */
export default async function BirdOfTheDay() {
  return (
    <>
      <section className="my-4">
        <Card className="w-full rounded-none border border-primary bg-blue-100 shadow-[12px_12px_0_0_rgba(192,132,252,0.8)] dark:border-foreground dark:bg-background lg:border-2 lg:shadow-[32px_32px_0_0_rgba(192,132,252,0.8)]">
          <CardHeader>
            <CardTitle>
              <h3 className="font-script text-3xl text-primary dark:text-foreground md:text-4xl">
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
  const result: ApiResponse<Bird> = await response.json();
  if (result.error) return <ErrorDisplay msg={result.message} />;

  const { data } = result;

  return (
    <>
      <StaticBirdImage bird={data} sizes="(max-width: 1024px) 100vw, 780px" />
      <h4 className="text-xl text-foreground hover:text-primary md:text-2xl">
        <Link href={`/birds/${data.id}`}>{data.commonName}</Link>
      </h4>
    </>
  );
}
