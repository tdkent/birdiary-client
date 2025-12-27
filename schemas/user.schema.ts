import { FORM } from "@/constants/app.constants";
import { z } from "zod";

// Inputs
const Biography = z
  .string()
  .max(
    FORM.TEXTAREA_MAX_CHARS,
    `Please enter ${FORM.TEXTAREA_MAX_CHARS} or fewer characters.`,
  )
  .optional();

const UserName = z
  .string()
  .max(24, "Please enter 24 or fewer characters.")
  .optional();

const ZipCode = z
  .string()
  .regex(/^\d{5}$/, "Please enter a valid 5-digit zip code.")
  .optional()
  .or(z.literal(""));

// Forms
export const EditProfileFormSchema = z.object({
  bio: Biography,
  name: UserName,
  zipcode: ZipCode,
});

// Form Types
export type EditProfileForm = z.infer<typeof EditProfileFormSchema>;
