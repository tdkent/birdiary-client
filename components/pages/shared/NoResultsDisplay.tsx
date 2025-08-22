import NewSightingButton from "@/components/pages/shared/NewSightingButton";

export default function NoResultsDisplay() {
  return (
    <>
      <div className="my-10 flex flex-col gap-8">
        <p className="italic">No data to show.</p>
        <NewSightingButton />
      </div>
    </>
  );
}
