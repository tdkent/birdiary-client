import { getSighting } from "@/actions/sighting";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import SignedOffBanner from "@/components/pages/shared/SignedOffBanner";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import SightingDetails from "@/components/pages/sightings/SightingDetails";
import { checkSession } from "@/helpers/auth";
import { checkValidParamInteger } from "@/helpers/data";
import type { SightingWithBirdAndLocation } from "@/models/display";
import type { Metadata } from "next";

type SightingViewProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: SightingViewProps): Promise<Metadata> {
  const sightingId = (await params).id;
  const hasSession = await checkSession();
  const sighting = hasSession
    ? ((await getSighting(Number(sightingId))) as SightingWithBirdAndLocation)
    : null;

  const pageTitle = sighting
    ? `${sighting.bird.commonName} (ID #${sightingId})`
    : `ID #${sightingId}`;

  return {
    title: `Sighting: ${pageTitle} | Birdiary`,
  };
}

/** Single sighting view. */
export default async function SightingView({ params }: SightingViewProps) {
  const { id } = await params;
  const validId = checkValidParamInteger(id);

  return (
    <>
      <SignedOffBanner />
      <ViewWrapper>
        <ViewHeader
          headingText="Sighting Details"
          descriptionText="View and edit the details of one of your sightings."
        />
        {validId ? (
          <>
            <SightingDetails sightingId={validId} />
          </>
        ) : (
          <>
            <ErrorDisplay statusCode={400} />
          </>
        )}
      </ViewWrapper>
    </>
  );
}
