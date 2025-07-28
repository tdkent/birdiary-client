import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BirdOfTheDay from "@/components/pages/home/BirdOfTheDay";

export default function Home() {
  return (
    <div>
      <header>
        <h1>Quickly log your bird sightings and build your birding diary</h1>
      </header>
      <BirdOfTheDay />
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
          unlimited data, keep track of your birdwatching life list, and add
          location data to your sightings.{" "}
          <Link href="/plans" className="underline hover:no-underline">
            View plans and accounts
          </Link>
          .
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
    </div>
  );
}
