import { Messages } from "@/models/api";
import { z } from "zod";

// Inputs
export const Email = z
  .string()
  .trim()
  .email({ message: Messages.EmailValidationError });

const FavoriteColor = z.string().optional();

export const Jwt = z.string().jwt();

const Password = z
  .string()
  .trim()
  .min(8, Messages.PasswordValidationError)
  .max(64, Messages.PasswordValidationError);

// Form Schemas
export const ForgotPasswordFormSchema = z.object({
  email: Email,
});

export const AuthFormSchema = ForgotPasswordFormSchema.extend({
  password: Password,
  favoriteColor: FavoriteColor,
});

export const UpdatePasswordFormSchema = z
  .object({
    currentPassword: Password,
    newPassword: Password,
    confirmNewPassword: Password,
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from old password.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const ResetPasswordFormSchema = z
  .object({
    newPassword: Password,
    confirmNewPassword: Password,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

// Form Types
export type AuthForm = z.infer<typeof AuthFormSchema>;
export type ForgotPasswordForm = z.infer<typeof ForgotPasswordFormSchema>;
export type ResetPasswordForm = z.infer<typeof ResetPasswordFormSchema>;
export type UpdatePasswordForm = z.infer<typeof UpdatePasswordFormSchema>;
