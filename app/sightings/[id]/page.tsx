import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import Sighting from "@/components/pages/sightings/Sighting";
import { checkValidParamInteger } from "@/helpers/data";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

/** Single sighting view. */
export default async function SightingView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const validId = checkValidParamInteger(id);

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Sighting Details"
          descriptionText="View and edit the details of one of your sightings."
        />
        {validId ? (
          <Sighting sightingId={validId} />
        ) : (
          <ErrorDisplay msg="Invalid request." />
        )}
      </ViewWrapper>
    </>
  );
}
