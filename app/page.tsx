import BirdOfTheDay from "@/components/pages/home/BirdOfTheDay";
import NewSightingButton from "@/components/pages/shared/NewSightingButton";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | Birdiary",
};

export default function HomeView() {
  return (
    <>
      <ViewWrapper>
        <header>
          <h1 className="text-[42px] md:text-7xl lg:text-[88px]">
            Quickly log bird sightings and build your{" "}
            <span className="font-script">birding diary.</span>
          </h1>
        </header>
        <section className="flex flex-col gap-6">
          <h2 className="font-script">Welcome to Birdiary!</h2>
          <p>
            Spot a bird? Choose from our comprehensive list of North American
            bird species and save the details of your sighting.
          </p>
          <p>
            Every observation you make automatically builds your personal
            birding diary&mdash;organized by date, location, and
            species&mdash;so you can revisit your sightings anytime.
          </p>
          <h3>Learn more about birds</h3>
          <p>
            Visit the{" "}
            <Link className="link-inline" href="/birds">
              Birdpedia
            </Link>{" "}
            and dive into detailed pages for more than 800 North American bird
            species, from crows and jays to swifts and thrushes!
          </p>
          <BirdOfTheDay />
          <h2>
            <span className="font-script">Go further</span> with an account
          </h2>
          <p>
            Interested in more? Create a free account to permanently store
            unlimited data, keep track of your birdwatching life list, and add
            location data to your sightings.{" "}
            <Link href="/plans" className="link-inline">
              View plans and accounts
            </Link>
            .
          </p>
        </section>
        <section className="flex flex-col gap-6">
          <h2>Ready to get started?</h2>
          <NewSightingButton />
        </section>
      </ViewWrapper>
    </>
  );
}
