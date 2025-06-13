import Modal from "@/components/ui/Modal";
import EditLocationForm from "@/components/forms/EditLocationForm";
import type { Location } from "@/types/models";

type EditLocationProps = {
  location: Location;
  locationId: number;
};

export default async function EditLocation({
  location,
  locationId,
}: EditLocationProps) {
  return (
    <Modal
      triggerText="edit"
      title="Edit Location"
      description="Update location address and map."
    >
      <EditLocationForm location={location} locationId={locationId} />
    </Modal>
  );
}
