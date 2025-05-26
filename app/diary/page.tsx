import CsrList from "@/components/pages/shared/CsrList";
import { apiRoutes } from "@/types/api";

export default function DiaryView() {
  return (
    <>
      <header>
        <h1>Diary</h1>
        <p>Your sightings grouped by date.</p>
      </header>
      <CsrList
        route={apiRoutes.groupedSightings("date")}
        variant="diary"
        tag="diary"
      />
    </>
  );
}
