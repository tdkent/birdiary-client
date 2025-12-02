import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import SignedOffBanner from "@/components/pages/shared/SignedOffBanner";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import EditSighting from "@/components/pages/sightings/EditSighting";
import { checkValidParamInteger } from "@/helpers/data";
import type { Metadata } from "next";

type EditSightingViewProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Edit sighting - Birdiary",
  description:
    "Edit the common name, date, description, or location of one of your bird sightings.",
};

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
