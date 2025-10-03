import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCookie } from "@/helpers/auth";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plans | Birdiary",
};

export default async function PlansView() {
  const token = await getCookie();
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Plans"
          descriptionText="Birdiary is free to use — no sign-up necessary. Start
          recording your bird sightings instantly. Want access to more features?
          Explore the added benefits of creating a free account below."
          useSeparator
        />
        <section className="flex flex-col gap-8">
          <h2>Plan Details</h2>
          <div className="flex flex-col gap-6 md:flex-row">
            <Card className="w-full max-w-sm md:p-4">
              <CardHeader className="text-center">
                <CardTitle className="text-xl md:text-2xl">Guest</CardTitle>
                <CardDescription className="text-base italic md:text-lg">
                  No account needed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex list-disc flex-col gap-1 px-4 text-lg md:gap-2 md:text-xl">
                  <li>Start birdwatching right away — no sign-up required</li>
                  <li>
                    Add, <span className="after:content-['*']">save</span>, and
                    view new bird sightings
                  </li>
                  <li>Explore bird species, diary entries, and summaries</li>
                  <li>View sightings filtered by date and species</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="w-full max-w-sm md:p-4">
              <CardHeader className="text-center">
                <CardTitle className="text-xl md:text-2xl">
                  Registered User
                </CardTitle>
                <CardDescription className="text-base italic md:text-lg">
                  Free account with extra features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex list-disc flex-col gap-1 px-4 text-lg md:gap-2 md:text-xl">
                  <li>All Guest features, plus:</li>
                  <li>
                    Add location data to your sightings (w/ Google Places)
                  </li>
                  <li>View your birdwatching life list</li>
                  <li>Data permanently stored and accessible across devices</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        <p className="px-6 text-base before:content-['*'] md:text-lg">
          Note: If you&apos;re not signed in, sightings you create are stored in
          your browser. The amount of data you can store is limited by your
          browser&apos;s storage capacity. Your data may be lost if your
          browser&apos;s cache is cleared. To keep your sightings safe and
          accessible across devices,{" "}
          {token ? (
            "sign in"
          ) : (
            <Link href="/signin" className="link-inline">
              sign in
            </Link>
          )}{" "}
          or{" "}
          {token ? (
            "create a free account"
          ) : (
            <Link href="/signup" className="link-inline">
              create a free account
            </Link>
          )}
          . You can transfer your existing data to your account at any time.
        </p>
      </ViewWrapper>
    </>
  );
}
