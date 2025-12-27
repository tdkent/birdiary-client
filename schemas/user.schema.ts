import { FORM } from "@/constants/app.constants";
import { Messages } from "@/models/api";
import { z } from "zod";

// Inputs
const Biography = z
  .string()
  .max(FORM.TEXTAREA_MAX_CHARS, Messages.BioValidationError)
  .optional();

const UserName = z.string().max(24, Messages.NameValidationError).optional();

const ZipCode = z
  .string()
  .regex(/^\d{5}$/, Messages.ZipCodeValidationError)
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
