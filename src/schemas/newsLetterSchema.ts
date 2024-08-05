import { z } from "zod";

export const newsLetterSchema = z.object({
    email: z.string().email("Invalid email"),
  });