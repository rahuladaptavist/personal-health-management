import { RegexConstant } from "@/helpers/constants";
import { z } from "zod";

export const SchemaFormResetPassword = z
  .object({
    code: z
      .string()
      .regex(RegexConstant.codeSixDigits, "Code must be a 6-digit number"),
    password: z
      .string()
      .regex(
        RegexConstant.password,
        "Password must have 8-60 characters, including uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ISchemaFormResetPassword = z.infer<typeof SchemaFormResetPassword>;
