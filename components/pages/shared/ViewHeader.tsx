/** Generic header and heading element for views. */
import { Separator } from "@/components/ui/separator";

type ViewHeaderProps = {
  headingText: string;
  descriptionText?: string;
};
export default function ViewHeader({
  headingText,
  descriptionText,
}: ViewHeaderProps) {
  return (
    <>
      <header className="flex flex-col gap-6">
        <h1>{headingText}</h1>
        {descriptionText && <p className="text-base">{descriptionText}</p>}
      </header>
      <Separator className="mx-auto w-4/5" />
    </>
  );
}
