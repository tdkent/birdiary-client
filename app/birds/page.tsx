import { redirect } from "next/navigation";
import List from "@/components/pages/shared/List";
import { apiRoutes } from "@/models/api";

export default async function BirdsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, startsWith } = await searchParams;

  if (!page || !parseInt(page) || parseInt(page) < 1) {
    redirect(`/birds?page=1${startsWith ? `&startsWith=${startsWith}` : ""}`);
  }

  if (startsWith && !!/[^A-Z$]/.test(startsWith)) {
    redirect(`/birds?page=${page}`);
  }

  const parsedPage = parseInt(page);

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
      <List
        variant="birdpedia"
        page={parsedPage}
        startsWith={startsWith}
        resource={apiRoutes.getBirds(parseInt(page), startsWith)}
      />
    </>
  );
}
