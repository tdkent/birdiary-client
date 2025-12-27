import { FORM } from "@/constants/app.constants";
import { Messages } from "@/models/api";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Inputs
const CommonName = z.string().trim();

const Date = z.date();

const Description = z
  .string()
  .trim()
  .max(FORM.TEXTAREA_MAX_CHARS, Messages.DescriptionValidationError)
  .optional();

const EditLocation = z.string().min(1);

const Location = z.string().trim().optional();

// Form Schemas
export const SightingFormSchema = z.object({
  commonName: CommonName,
  date: Date,
  description: Description,
  location: Location,
});

export const EditLocationFormSchema = z.object({
  location: EditLocation,
});

// Form Types
export type SightingForm = z.infer<typeof SightingFormSchema>;
export type EditLocationForm = z.infer<typeof EditLocationFormSchema>;

// React-hook-form Types (applies `react-hook-form` methods to type).
export type FormReturnSightingForm = UseFormReturn<SightingForm>;
export type FormReturnEditLocationForm = UseFormReturn<EditLocationForm>;
