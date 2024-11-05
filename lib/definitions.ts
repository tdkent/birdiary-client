import { z } from "zod";

export const SignupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().superRefine((val, ctx) => {
    if (val.length < 8 || val.length > 36) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must 8-36 characters.",
      });
    }
  }),
});
