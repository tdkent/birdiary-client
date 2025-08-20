/** Generic header and heading element for views. */
import { Separator } from "@/components/ui/separator";

type ViewHeaderProps = {
  descriptionText?: string;
  headingText: string;
  useSeparator?: boolean;
};
export default function ViewHeader({
  descriptionText,
  headingText,
  useSeparator,
}: ViewHeaderProps) {
  return (
    <>
      <header className="flex flex-col gap-6">
        <h1>{headingText}</h1>
        {descriptionText && <p className="text-lg">{descriptionText}</p>}
      </header>
      {useSeparator && <Separator className="mx-auto w-4/5" />}
    </>
  );
}
