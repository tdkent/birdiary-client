import { redirect } from "next/navigation";
import List from "@/components/pages/shared/List";
import { BASE_URL } from "@/constants/env";

export default async function LifeListView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, startsWith } = await searchParams;
  if (!page) {
    redirect(`/lifelist?page=1`);
  }

  const resource = `${BASE_URL}/sightings?groupBy=lifelist&page=${page}`;

  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Life List</h1>
        <p>
          A complete list of all the North American bird species you have
          observed.
        </p>
      </header>
      <List
        pathname="lifelist"
        resource={resource}
        page={page}
        startsWith={startsWith}
      />
    </>
  );
}
