import QuickSightingForm from "@/components/forms/QuickSightingForm";
import SightingList from "@/components/pages/SightingList";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Birdiary</h1>
      <QuickSightingForm />
      <SightingList />
    </div>
  );
}
