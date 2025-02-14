import SimpleSightingForm from "@/components/forms/SimpleSighting";
import SightingList from "@/components/Sighting/SightingList/SightingList";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Birdiary</h1>
      <SimpleSightingForm />
      <SightingList />
    </div>
  );
}
