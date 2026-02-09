import { z } from "zod";
export const signupschema = z.object({
  name: z
    .string()
    .max(20, "Too long name")
    .min(1, "Too short name")
    .transform((val) => val.replace(/[^a-zA-Z0-9]/g, "")),

  email: z
    .string()
    .email("invalid email")
    .transform((val) => val.replace(/[^a-zA-Z0-9@_.-]/g, "")),

  password: z
    .string()
    .min(6, "Password must be at least 6")
    .max(8, "Password must be at max 8")
    .transform((val) => val.replace(/[^a-zA-Z0-9]/g, "")),

  confirmpassword: z
    .string()
    .min(6, "Password must be at least 6")
    .max(8, "Password must be at max 8")
    .transform((val) => val.replace(/[^a-zA-Z0-9]/g, "")),
});

export type Signupschema = z.infer<typeof signupschema>;
