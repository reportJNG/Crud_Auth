import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .email("invalid email")
    .transform((val) => val.replace(/[^a-zA-Z0-9@_.-]/g, "")),

  password: z
    .string()
    .min(6, "Password must be at least 6")
    .max(8, "Password must be at max 8")
    .transform((val) => val.replace(/[^a-zA-Z0-9]/g, "")),
});

export type LoginSchema = z.infer<typeof loginSchema>;
