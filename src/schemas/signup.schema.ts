import { z } from "zod";
export const signupschema = z.object({
  name: z
    .string()
    .max(20, "Human name please")
    .min(1, "Please insert name")
    .transform((val) => val.replace(/[^a-zA-Z0-9]/g, "")),

  email: z
    .string()
    .min(1, "Email is required")
    .email("invalid email")
    .transform((val) => val.replace(/[^a-zA-Z0-9@_-]/g, "")),
  password: z
    .string()
    .min(6, "Password must be at least 6")
    .max(8, "Password must be at least 6")
    .transform((val) => val.replace(/[^a-zA-Z0-9]/g, "")),
  confirmpassword: z
    .string()
    .min(6, "Password must be at least 6")
    .max(8, "Password must be at least 6")
    .transform((val) => val.replace(/[^a-zA-Z0-9]/g, "")),
});

export type Signupschema = z.infer<typeof signupschema>;
