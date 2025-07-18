import { quicksand } from "@/lib/fonts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Slideshow from "@/components/pages/home/Slideshow";

export default function Home() {
  return (
    <div>
      <header>
        <h1 className={`${quicksand.className}`}>
          Quickly log your bird sightings and build your birding diary
        </h1>
        <h2 className={`${quicksand.className}`}>
          Birdiary is a free website. An account is not required.
        </h2>
      </header>
      <Slideshow />
      <section>
        <h3>Create your birding diary</h3>
        <p>
          Spot a bird? Pick from our database of more than 800 North American
          bird species, and log the sighting details.
        </p>
        <p>
          Your sightings will be used to create your birding diary, tracking
          your sightings by date and species.
        </p>
        <h3>Go further with an account</h3>
        <p>
          Interested in more? Create a free account to permanently store
          unlimited <span className="after:content-['*']">data</span>, keep
          track of your birdwatching life list, and add location data to your
          sightings.{" "}
          <Link href="/plans" className="underline hover:no-underline">
            View plans
          </Link>{" "}
          to learn more.
        </p>
      </section>
      <section>
        <h3>Ready to get started?</h3>
        <Button asChild>
          <Link href="/new">
            <Plus />
            Add a new sighting
          </Link>
        </Button>
      </section>
      <section className="mt-16">
        <p className="rounded border p-4 text-sm before:content-['*']">
          If you do not have an account or are not signed in, your sighting and
          diary data is stored in your browser and not our database. This limits
          the total amount of data you can store, and your data may be lost if
          your browser&apos;s data cache is deleted.
        </p>
      </section>
    </div>
  );
}
