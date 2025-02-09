import { RegexConstant } from "@/helpers/constants";
import { z } from "zod";

export const SchemaFormLogin = z.object({
  email: z.string().regex(RegexConstant.email, "Invalid email format"),
  password: z
    .string()
    .regex(
      RegexConstant.password,
      "Password must have 8-60 characters, including uppercase, lowercase, number, and special character"
    ),
});

export type ISchemaFormLogin = z.infer<typeof SchemaFormLogin>;
