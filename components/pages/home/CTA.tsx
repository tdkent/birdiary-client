import NewSightingButton from "@/components/pages/shared/NewSightingButton";
import { Button } from "@/components/ui/button";
import { checkSession } from "@/helpers/auth.helpers";
import Link from "next/link";

export default async function CTA() {
  const hasSession = await checkSession();
  return (
    <>
      <section className="flex flex-col gap-6">
        <h2 className="font-script text-4xl md:text-5xl lg:text-6xl">
          Ready to get started?
        </h2>
        <div className="my-4 flex flex-col gap-6 lg:flex-row">
          {!hasSession && (
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Create an account</Link>
            </Button>
          )}
          <NewSightingButton />
        </div>
      </section>
    </>
  );
}
