import SightingForm from "@/components/forms/SightingForm";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log a new bird sighting - Birdiary",
  description:
    "Record a new bird sighting, including the date, description and location. The sighting will be added to your birdwatching diary.",
};

export default function NewView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="New Bird Sighting" />
        <SightingForm />
      </ViewWrapper>
    </>
  );
}
