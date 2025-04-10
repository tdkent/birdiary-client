import { caveat } from "@/lib/fonts";
import QuickSightingForm from "@/components/forms/QuickSightingForm";
import SightingForm from "@/components/forms/SightingForm";
import SightingsList from "@/components/pages/sightings/SightingsList";
import Modal from "@/components/ui/Modal";
import { apiRoutes } from "@/types/api";

export default function Home() {
  return (
    <div className="">
      <h1 className={`${caveat.className}`}>Welcome to Birdiary!</h1>
      <p className={`${caveat.className} mt-4 text-2xl`}>
        Quickly log your sightings.
      </p>
      <p className={`${caveat.className} text-2xl`}>
        Build your birding diary.
      </p>
      <section className="my-6 rounded border p-4">
        <div className="">
          <h3>Spot a bird? Add it fast!</h3>
          <QuickSightingForm />
        </div>
        <Modal
          triggerText="+ Add detailed sighting"
          title="Add New Sighting"
          description="Add a new bird sighting to your diary."
        >
          <SightingForm />
        </Modal>
      </section>
      <section className="my-4">
        <h2>Your Recent Sightings</h2>
        <SightingsList route={apiRoutes.recentSightings} variant="list" />
      </section>
    </div>
  );
}
