import SightingForm from "@/components/forms/SightingForm";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";

export default function NewView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Add a new bird sighting"
          descriptionText="Add a new sighting with date and description to your birdwatching diary. 
          Signed-in users may also add a location."
          useSeparator
        />
        <SightingForm />
      </ViewWrapper>
    </>
  );
}
