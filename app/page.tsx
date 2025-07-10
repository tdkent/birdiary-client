import { caveat } from "@/lib/fonts";
import QuickSightingForm from "@/components/forms/QuickSightingForm";
import DetailedSightingModal from "@/components/pages/home/DetailedSightingModal";
import CsrList from "@/components/pages/shared/CsrList";
import { apiRoutes } from "@/models/api";

export default function Home() {
  return (
    <div>
      <header>
        <h1 className={`${caveat.className}`}>Welcome to Birdiary!</h1>
        <p className={`${caveat.className} mt-4 text-2xl`}>
          Quickly log your sightings.
        </p>
        <p className={`${caveat.className} text-2xl`}>
          Build your birding diary.
        </p>
      </header>
      <section className="my-6 rounded border p-4">
        <div className="">
          <h3>Spot a bird? Add it fast!</h3>
          <QuickSightingForm />
        </div>
        <DetailedSightingModal />
      </section>
      <section className="my-4">
        <h2>Your Recent Sightings</h2>
        <CsrList
          route={apiRoutes.recentSightings}
          tag="sightings"
          variant="recentSighting"
        />
      </section>
    </div>
  );
}
