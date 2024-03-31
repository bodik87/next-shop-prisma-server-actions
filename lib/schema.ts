import { z } from "zod";

export const LoginFormDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Min 3"),
});
