import BirdpediaList from "@/components/pages/birdpedia/BirdpediaList";

export default async function BirdsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Get search params from URL
  const { page, startsWith } = await searchParams;

  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Birdpedia</h1>
        <h2>Browse more than 800 species of North American birds!</h2>
        <p>
          The Birdpedia page includes all bird species listed as Common or Rare,
          as rated by the ABA.
        </p>
      </header>
      <BirdpediaList page={page} startsWith={startsWith} />
    </>
  );
}
