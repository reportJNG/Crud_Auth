import { z } from "zod";
export const signupschema = z.object({
  name: z.string().max(20, "Human name please").min(1, "Please insert name"),

  email: z.string().min(1, "Email is required").email("invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6")
    .max(8, "Password must be at least 6"),
  confirmpassword: z
    .string()
    .min(6, "Password must be at least 6")
    .max(8, "Password must be at least 6"),
});

export type Signupschema = z.infer<typeof signupschema>;
