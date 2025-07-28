import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PlansView() {
  return (
    <>
      <header>
        <h1>Plans &amp; Accounts</h1>
        <p>
          Birdiary is completely free to use—no sign-up necessary. Start
          recording your bird sightings instantly. Want access to more features?
          Explore the added benefits of creating a free account below.
        </p>
      </header>
      <section>
        <div className="flex max-lg:flex-col">
          <Card className="my-12 w-full max-w-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Guest</CardTitle>
              <CardDescription className="italic">
                No account needed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc text-sm">
                <li>Start birdwatching immediately—no sign-up required</li>
                <li>
                  Add, <span className="after:content-['*']">save</span>, and
                  view new bird sightings
                </li>
                <li>Explore bird species, diary entries, and summaries</li>
                <li>View sightings filtered by date and species</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="my-12 w-full max-w-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Registered User</CardTitle>
              <CardDescription className="italic">
                Free account with extra features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc text-sm">
                <li>All Guest features, plus:</li>
                <li>Add location data to your sightings (w/ Google Places)</li>
                <li>View your birdwatching life list</li>
                <li>Data permanently stored and accessible across devices</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-2 text-xs">
          <p className="my-0 before:content-['*']">
            Note: If you&apos;re not signed in, sightings you create are stored
            in your browser. The amount of data you can store is limited by your
            browser&apos;s storage capacity. Your data may be lost if your
            browser&apos;s cache is cleared. To keep your sightings safe and
            accessible across devices, <Link href="/signin">sign in</Link> or{" "}
            <Link href="/signup">create a free account</Link>. You can transfer
            your existing data to your account at any time.
          </p>
        </div>
      </section>
    </>
  );
}
