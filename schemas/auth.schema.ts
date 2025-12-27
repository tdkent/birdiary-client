import { z } from "zod";

// Inputs
export const Email = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email address." });

const FavoriteColor = z.string().optional();

export const Jwt = z.string().jwt();

const Password = z
  .string()
  .trim()
  .min(8, "Please enter a valid password 8-64 characters long.")
  .max(64, "Please enter a valid password 8-64 characters long.");

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
