import { RegexConstant } from "@/helpers/constants";
import { z } from "zod";

export const SchemaFormSignup = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().regex(RegexConstant.email, "Invalid email format"),
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

export type ISchemaFormSignup = z.infer<typeof SchemaFormSignup>;
