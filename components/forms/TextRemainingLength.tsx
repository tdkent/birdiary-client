import { FormDescription } from "@/components/ui/form";

type TextRemainingLengthProps = {
  allowedLength: number;
  currLength: number;
};

export default function TextRemainingLength({
  allowedLength,
  currLength,
}: TextRemainingLengthProps) {
  const remainingLength = allowedLength - currLength;
  return (
    <>
      <FormDescription
        className={`${remainingLength < 0 && "text-destructive"} px-1 text-sm md:text-base`}
      >
        {remainingLength < 0
          ? `${currLength - allowedLength} character${remainingLength < -1 ? "s" : ""} too many!`
          : `${allowedLength - currLength} character${remainingLength > 1 ? "s" : ""} remaining`}
      </FormDescription>
    </>
  );
}
