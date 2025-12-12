import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function Plans() {
  return (
    <>
      <section className="flex flex-col gap-6" id="plans">
        <h2 className="font-script text-4xl md:text-5xl lg:text-6xl">
          Free to use, no account required.
        </h2>
        <p>
          Create a free account to access all Birdiary&apos;s features. Prefer
          to keep things simple? No problem, you can start logging your bird
          sightings right away, no registration required!
        </p>
        <div className="flex flex-col gap-6 md:flex-row">
          <Card className="w-full max-w-sm md:p-4">
            <CardHeader className="text-center">
              <CardTitle className="text-xl md:text-2xl">Guest User</CardTitle>
              <CardDescription className="text-base italic md:text-lg">
                Free, no account required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex list-disc flex-col gap-1 px-4 text-lg md:gap-2 md:text-xl">
                <li>Start birdwatching right away — no sign-up required.</li>
                <li>Add, save, and view bird sightings.</li>
                <li>
                  Explore bird species, diary entries, and summaries.{" "}
                  <Dialog>
                    <DialogTrigger className="link-inline">
                      Learn More
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Adding Sightings as a Guest User
                        </DialogTitle>
                      </DialogHeader>
                      <div>
                        <ul className="list-disc">
                          <div className="my-4 flex flex-col gap-2 px-4">
                            <li>
                              Sightings you create without an account are stored
                              in your browser.
                            </li>
                            <li>
                              Create an account to transfer sightings from your
                              browser to our database for permanent storage.
                            </li>
                            <li>
                              Note that data added to a public browser will be
                              viewable by others.
                            </li>
                          </div>
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="w-full max-w-sm md:p-4">
            <CardHeader className="text-center">
              <CardTitle className="text-xl md:text-2xl">
                Registered User
              </CardTitle>
              <CardDescription className="text-base italic md:text-lg">
                Free account w/ extra features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex list-disc flex-col gap-1 px-4 text-lg md:gap-2 md:text-xl">
                <li>All Guest features, plus:</li>
                <li>Add locations.</li>
                <li>View your life list.</li>
                <li>Personal profile and stats.</li>
                <li>Transfer sightings created as a Guest to your account.</li>
                <li>Sighting data is accessible across devices.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <p className="px-2 text-sm before:content-['*'] md:text-base">
          Sighting data created as a guest user is stored in your browser, where
          it is subject to capacity limits and may be lost if the cache is
          cleared. Sightings may be transferred from your browser to your
          account at any time.
        </p>
      </section>
    </>
  );
}
