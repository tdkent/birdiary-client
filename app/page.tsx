import QuickSightingForm from "@/components/forms/QuickSightingForm";
import SightingForm from "@/components/forms/SightingForm";
import Sightings from "@/components/pages/Sightings";
import Modal from "@/components/ui/Modal";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Birdiary</h1>
      <section>
        <div className="border p-4 my-4">
          <h2>Quick Sighting Entry</h2>
          <p>Spot a bird? Add it fast!</p>
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
      <section>
        <h2>Your Recent Sightings</h2>
        <Sightings />
      </section>
    </div>
  );
}
