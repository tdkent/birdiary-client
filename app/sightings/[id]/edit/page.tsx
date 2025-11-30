import { getSighting } from "@/actions/sighting";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import SignedOffBanner from "@/components/pages/shared/SignedOffBanner";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import EditSighting from "@/components/pages/sightings/EditSighting";
import { checkValidParamInteger } from "@/helpers/data";
import type { SightingWithLocation } from "@/models/display";
import type { Metadata } from "next";

type EditSightingViewProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: EditSightingViewProps): Promise<Metadata> {
  const sightingId = (await params).id;
  const sighting = (await getSighting(
    Number(sightingId),
  )) as SightingWithLocation;

  return {
    title: `Edit Sighting (ID #${sighting.id}) | Birdiary`,
  };
}

export default async function EditSightingView({
  params,
}: EditSightingViewProps) {
  const { id } = await params;
  const validId = checkValidParamInteger(id);
  return (
    <>
      <SignedOffBanner />
      <ViewWrapper>
        <ViewHeader headingText="Edit Sighting" />
        {validId ? (
          <>
            <EditSighting sightingId={validId} />
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
