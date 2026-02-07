import { z } from "zod";
export const signupschema = z.object({
  email: z.string().email("invalid email"),
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
