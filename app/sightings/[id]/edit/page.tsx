import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import EditSighting from "@/components/pages/sightings/EditSighting";
import { checkValidParamInteger } from "@/helpers/data";

export default async function EditSightingView({
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
          headingText="Edit Sighting"
          descriptionText="Update the details of one of your sightings."
          useSeparator
        />
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
