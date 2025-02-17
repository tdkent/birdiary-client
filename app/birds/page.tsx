import { Suspense } from "react";
import PageContainer from "@/components/layout/PageContainer";
import BirdList from "@/components/pages/BirdList";

export default async function BirdsView() {
  return (
    <PageContainer
      header="Birdpedia"
      desc="Index of all bird species with a rarity rating of Rare or better, as determined by the ABA."
    >
      <Suspense fallback={<p>Loading some stuff...</p>}>
        <BirdList />
      </Suspense>
    </PageContainer>
  );
}
