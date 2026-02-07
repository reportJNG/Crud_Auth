import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6")
    .max(8, "Password must be at max 8"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
