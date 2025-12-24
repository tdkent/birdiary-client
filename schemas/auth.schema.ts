import { Messages } from "@/models/api";
import { z } from "zod";

// Inputs
const Email = z
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

// Forms
export const EmailInput = z.object({
  email: Email,
});

export const AuthForm = EmailInput.extend({
  password: Password,
  favoriteColor: FavoriteColor,
});

export const UpdatePasswordForm = z
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

export const ResetPasswordForm = z
  .object({
    newPassword: Password,
    confirmNewPassword: Password,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
