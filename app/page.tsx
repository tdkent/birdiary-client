import BirdOfTheDay from "@/components/pages/home/BirdOfTheDay";
import NewSightingButton from "@/components/pages/shared/NewSightingButton";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import Link from "next/link";

export default function HomeView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Quickly log your bird sightings and build your birding diary"
          useSeparator
        />
        <section className="flex flex-col gap-6">
          <h2>Create your birding diary</h2>
          <p>
            Spot a bird? Pick from our database of more than 800 North American
            bird species, and log the sighting details.
          </p>
          <p>
            Your sightings will be used to create your birding diary, tracking
            your sightings by date and species.
          </p>
          <BirdOfTheDay />
          <h2>Go further with an account</h2>
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
