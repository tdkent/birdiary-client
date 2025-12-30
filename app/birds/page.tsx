import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { PAGINATE } from "@/constants/app.constants";
import { getUserProfileOrNull } from "@/helpers/auth";
import { checkValidParamInteger } from "@/helpers/data";
import { apiRoutes } from "@/models/api";
import { ErrorMessages } from "@/types/error-messages.enum";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Browse 800+ species of birds - Birdiary",
  description:
    "View a list of more than 800 North American bird species. Search by name or family. Click on any bird for full details.",
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

  const user = await getUserProfileOrNull();
  const favBirdId = user && user.favoriteBirdId;

  const parsedPage = checkValidParamInteger(page);

  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="Birdpedia" />
        {!parsedPage ||
        (search && search.length < 3) ||
        (startsWith &&
          (startsWith.length !== 1 || !/[A-Z]/.test(startsWith))) ? (
          <>
            <ErrorDisplay msg={ErrorMessages.BadRequest} />
          </>
        ) : (
          <>
            <Suspense
              fallback={
                <Pending
                  variant="listWithSorting"
                  listSize={PAGINATE.LARGE_LIST}
                />
              }
            >
              <List
                favBirdId={favBirdId}
                page={parsedPage}
                resource={apiRoutes.birds(parsedPage, search, startsWith)}
                search={search}
                startsWith={startsWith}
                variant="birds"
              />
            </Suspense>
          </>
        )}
      </ViewWrapper>
    </>
  );
}
