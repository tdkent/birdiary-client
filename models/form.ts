import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Location } from "@/models/db";
import { Messages } from "@/models/api";
import { DESCRIPTION_LENGTH } from "@/constants/constants";

// Zod Schemas
export const signupFormSchema = z.object({
  email: z.string().email({ message: Messages.EmailValidationError }),
  password: z.string().superRefine((val, ctx) => {
    if (val.length < 8 || val.length > 36) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: Messages.PasswordValidationError,
      });
    }
  }),
});

export const sightingSchema = z.object({
  commonName: z.string(),
  date: z.date(),
  description: z.string().max(DESCRIPTION_LENGTH).optional(),
  location: z.string().optional(),
});

export const editLocationSchema = z.object({
  location: z.string().min(1),
});

export const editProfileSchema = z.object({
  name: z.string().max(24).optional(),
  zipcode: z
    .string()
    .regex(/^\d{5}$/, { message: Messages.ZipCodeValidationError })
    .optional()
    .or(z.literal("")),
});

// Form types
export type AuthForm = z.infer<typeof signupFormSchema>;
export type SightingForm = z.infer<typeof sightingSchema>;
export type LocationForm = z.infer<typeof editLocationSchema>;
export type CreateLocationDto = Pick<Location, "lat" | "lng" | "name">;
export type CreateSightingDto = {
  birdId: number;
  date: string;
  description: string | null;
  location?: CreateLocationDto;
};

// react-hook-form types
export type AuthFormProp = UseFormReturn<AuthForm>;
export type SightingFormProp = UseFormReturn<SightingForm>;
export type EditLocationFormSchemaProp = UseFormReturn<LocationForm>;

// Form controls
//? Merge with SortValues
export type DiarySortOptions = "dateDesc" | "dateAsc" | "sightings";

export type SortValues =
  | "alphaAsc"
  | "alphaDesc"
  | "dateAsc"
  | "dateDesc"
  | "count"
  | "";

export type SortOptions = { value: SortValues; text: string }[];

export const sortByAlphaOptions = [
  { value: "alphaAsc", text: "A - Z" },
  { value: "alphaDesc", text: "Z - A" },
] as const;

export const sortByDateOptions = [
  { value: "dateAsc", text: "Oldest - Newest" },
  { value: "dateDesc", text: "Newest - Oldest" },
] as const;

export const sortBySightingsCount = {
  value: "count",
  text: "Most Sightings",
} as const;
