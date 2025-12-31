import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import SightingDetails from "@/components/pages/sightings/SightingDetails";
import { getUserProfileOrNull } from "@/helpers/auth";
import { checkValidParamInteger } from "@/helpers/data";
import { ErrorMessages } from "@/types/error-messages.enum";
import type { Metadata } from "next";

type SightingViewProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Sighting details - Birdiary",
  description:
    "View the details of one of your bird sightings including the bird's common name, sighting date, description, and location. You may also edit or delete the sighting",
};

/** Single sighting view. */
export default async function SightingView({ params }: SightingViewProps) {
  const { id } = await params;
  const validId = checkValidParamInteger(id);

  const user = await getUserProfileOrNull();
  const favBirdId = user && user.favoriteBirdId;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          backLinkHref="sightings"
          backLinkText="Go to my sightings"
          headingText="Sighting Details"
        />
        {validId ? (
          <>
            <SightingDetails favBirdId={favBirdId} sightingId={validId} />
          </>
        ) : (
          <>
            <ErrorDisplay msg={ErrorMessages.BadRequest} />
          </>
        )}
      </ViewWrapper>
    </>
  );
}
