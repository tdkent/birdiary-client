import PendingIcon from "@/components/forms/PendingIcon";

export default function Loading() {
  return (
    <>
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
        <PendingIcon strokeWidth={1.5} size={40} />
      </div>
    </>
  );
}
