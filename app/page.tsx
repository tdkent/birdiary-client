import BirdOfTheDay from "@/components/pages/home/BirdOfTheDay";
import CTA from "@/components/pages/home/CTA";
import Plans from "@/components/pages/home/Plans";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create your birdwatching diary - Birdiary",
};

export default async function HomeView() {
  return (
    <>
      <ViewWrapper>
        <header>
          <h1 className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text px-1 py-4 text-[42px] text-transparent drop-shadow dark:from-rose-100 dark:to-violet-400 dark:text-transparent dark:drop-shadow-none md:text-7xl lg:text-[88px]">
            Quickly log bird sightings and build your birding diary.
          </h1>
        </header>
        <section className="flex flex-col gap-6">
          <h2 className="font-script text-4xl md:text-5xl lg:text-6xl">
            Welcome to Birdiary!
          </h2>
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
        </section>
        <BirdOfTheDay />
        <Plans />
        <CTA />
      </ViewWrapper>
    </>
  );
}
