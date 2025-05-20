import { redirect } from "next/navigation";
import List from "@/components/pages/shared/List";
import { BASE_URL } from "@/constants/env";

export default async function BirdsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, startsWith } = await searchParams;
  if (!page) {
    redirect(`/birds?page=1${startsWith ? `&startsWith=${startsWith}` : ""}`);
  }

  const resource = `${BASE_URL}/birds?page=${page}${startsWith ? `&startsWith=${startsWith}` : ""}`;

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
        page={page}
        startsWith={startsWith}
        resource={resource}
      />
    </>
  );
}
