import { FormDescription } from "@/components/ui/form";
import { FREE_TEXT_LENGTH } from "@/constants/constants";

type TextRemainingLengthProps = {
  currLength: number;
};

export default function TextRemainingLength({
  currLength,
}: TextRemainingLengthProps) {
  const remainingLength = FREE_TEXT_LENGTH - currLength;
  return (
    <>
      <FormDescription
        className={`${remainingLength < 0 && "text-destructive"} px-1 text-sm md:text-base`}
      >
        {remainingLength < 0
          ? `${currLength - FREE_TEXT_LENGTH} character${remainingLength < -1 ? "s" : ""} too many!`
          : `${FREE_TEXT_LENGTH - currLength} character${remainingLength > 1 ? "s" : ""} remaining`}
      </FormDescription>
    </>
  );
}
