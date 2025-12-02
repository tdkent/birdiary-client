import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import SignedOffBanner from "@/components/pages/shared/SignedOffBanner";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { RESULTS_PER_PAGE } from "@/constants/constants";
import { checkValidParamInteger } from "@/helpers/data";
import { apiRoutes } from "@/models/api";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Browse 800+ species of birds - Birdiary",
  description: "Browse more than 800 species of North American birds.",
};

export default async function BirdsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, search, startsWith } = await searchParams;

  let fallbackQuery = "";
  if (startsWith) fallbackQuery = `&startsWith=${startsWith}`;
  if (search) fallbackQuery = `&search=${search}`;

  if (!page) {
    redirect(`/birds?page=1${fallbackQuery}`);
  }

  if (search && startsWith) {
    redirect(`/birds?page=${page}&search=${search}`);
  }

  const parsedPage = checkValidParamInteger(page);

  return (
    <>
      <SignedOffBanner />
      <ViewWrapper>
        <ViewHeader headingText="Birdpedia" />
        {!parsedPage ||
        (search && search.length < 3) ||
        (startsWith &&
          (startsWith.length !== 1 || !/[A-Z]/.test(startsWith))) ? (
          <>
            <ErrorDisplay statusCode={400} />
          </>
        ) : (
          <>
            <Suspense
              fallback={
                <Pending
                  variant="listWithSorting"
                  listSize={RESULTS_PER_PAGE}
                />
              }
            >
              <List
                variant="birds"
                page={parsedPage}
                search={search}
                startsWith={startsWith}
                resource={apiRoutes.birds(parsedPage, search, startsWith)}
              />
            </Suspense>
          </>
        )}
      </ViewWrapper>
    </>
  );
}
