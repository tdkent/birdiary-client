import { Button } from "@/components/ui/button";
import { MapPin, Pencil } from "lucide-react";
import type { DiaryDetails } from "@/types/models";

type DiaryEntryProps = {
  entry: DiaryDetails;
};

export default function DiaryDetailsListItem({ entry }: DiaryEntryProps) {
  return (
    <>
      <article className="my-4 flex flex-col gap-4 rounded-md border p-4">
        <div className="flex items-center justify-between">
          <h3>{entry.commName}</h3>
          <Button variant="ghost" className="w-fit p-0">
            <Pencil />
            edit
          </Button>
        </div>
        {entry.location && (
          <div className="flex items-center gap-2.5">
            <MapPin size="1.5rem" strokeWidth="1.5px" />
            <p className="text-sm">{entry.location.name}</p>
          </div>
        )}
        {entry.desc && <p className="">{entry.desc}</p>}
      </article>
    </>
  );
}
