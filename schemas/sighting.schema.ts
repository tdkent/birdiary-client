import { FREE_TEXT_LENGTH } from "@/constants/constants";
import birdNames from "@/data/birds";
import { Messages } from "@/models/api";
import { z } from "zod";

// Inputs
const CommonName = z
  .string()
  .trim()
  .refine((val) => !birdNames.includes(val), "Please select a valid bird.");

const Date = z.date();

const Description = z
  .string()
  .trim()
  .max(FREE_TEXT_LENGTH, Messages.DescriptionValidationError)
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
