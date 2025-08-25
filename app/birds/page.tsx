import { Suspense } from "react";
import { redirect } from "next/navigation";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import { apiRoutes } from "@/models/api";
import { RESULTS_PER_PAGE } from "@/constants/constants";

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
      <ViewWrapper>
        <ViewHeader
          headingText="Birdpedia"
          descriptionText="Browse 838 species of North American birds."
        />
        <Suspense
          fallback={
            <Pending
              variant="listDoubleRowWithControls"
              listSize={RESULTS_PER_PAGE}
            />
          }
        >
          <List
            variant="birdpedia"
            page={parsedPage}
            startsWith={startsWith}
            resource={apiRoutes.birds(parseInt(page), startsWith)}
          />
        </Suspense>
      </ViewWrapper>
    </>
  );
}
