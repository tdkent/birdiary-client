import { Suspense } from "react";
import PageLayout from "@/components/layout/page/PageLayout";
import ShowAllBirds from "@/components/core/birds/ShowAllBirds";

export default async function BirdsView() {
  return (
    <PageLayout
      header="Birdpedia"
      desc="Index of all bird species with a rarity rating of Rare or better, as determined by the ABA."
    >
      <Suspense fallback={<p>Loading some stuff...</p>}>
        <ShowAllBirds />
      </Suspense>
    </PageLayout>
  );
}
