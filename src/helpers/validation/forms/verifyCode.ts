import { RegexConstant } from "@/helpers/constants";
import { z } from "zod";

export const SchemaFormVerifyCode = z.object({
  code: z
    .string()
    .regex(RegexConstant.codeSixDigits, "Code must be a 6-digit number"),
});

export type ISchemaFormVerifyCode = z.infer<
  typeof SchemaFormVerifyCode
>;
