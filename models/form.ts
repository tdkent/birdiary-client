import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Location } from "@/models/db";

// Zod Schemas
export const signupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().superRefine((val, ctx) => {
    if (val.length < 8 || val.length > 36) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must 8-36 characters.",
      });
    }
  }),
  transferStorage: z.boolean(),
});

export const sightingSchema = z.object({
  commonName: z.string(),
  date: z.date().optional(),
  description: z.string().max(150).optional(),
  location: z.string().optional(),
});

export const editLocationSchema = z.object({
  location: z.string().min(1),
});

// Form types
export type AuthForm = z.infer<typeof signupFormSchema>;
export type SightingForm = z.infer<typeof sightingSchema>;
export type EditLocationFormSchema = z.infer<typeof editLocationSchema>;
export type CreateSightingDto = {
  birdId: number;
  date: string;
  description: string | null;
  location?: Location;
};

// react-hook-form types
export type AuthFormProp = UseFormReturn<AuthForm>;
export type SightingFormProp = UseFormReturn<SightingForm>;
export type EditLocationFormSchemaProp = UseFormReturn<EditLocationFormSchema>;

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
