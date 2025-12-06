import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ExportCsv() {
  return (
    <>
      <div className="my-6 rounded-md border p-4 md:p-6">
        <h4 className="text-lg md:text-xl">Export Sightings</h4>
        <p className="my-6 text-base">
          Download your sightings data to a CSV file.
        </p>
        <Button size="lg" variant="new">
          <Download />
          Export
        </Button>
      </div>
    </>
  );
}
