import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import BirdOfTheDay from "@/components/pages/home/BirdOfTheDay";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1>Quickly log your bird sightings and build your birding diary</h1>
      </header>
      <Separator className="mx-auto w-4/5" />
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
          <Link href="/plans" className="underline hover:no-underline">
            View plans and accounts
          </Link>
          .
        </p>
      </section>
      <section className="flex flex-col gap-6">
        <h2>Ready to get started?</h2>
        <Button asChild variant="new" size="lg">
          <Link href="/new">
            <Plus strokeWidth={2.5} size={18} />
            Add a new sighting
          </Link>
        </Button>
      </section>
    </div>
  );
}
