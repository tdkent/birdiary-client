import Birdpedia from "@/components/pages/birds/Birdpedia";

export default async function BirdsView() {
  return (
    <>
      <h1>Birdpedia</h1>
      <h2>Browse more than 800 species of North American birds!</h2>
      <p>
        The Birdpedia page includes all bird species listed as Common or Rare,
        as rated by the ABA.
      </p>
      <Birdpedia />
    </>
  );
}
