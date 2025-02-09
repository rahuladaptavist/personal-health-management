import { RegexConstant } from "@/helpers/constants";
import { z } from "zod";

export const SchemaFormForgotPassword = z.object({
  email: z.string().regex(RegexConstant.email, "Invalid email format"),
});

export type ISchemaFormForgotPassword = z.infer<
  typeof SchemaFormForgotPassword
>;
