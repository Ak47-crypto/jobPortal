import { z } from "zod";
// const regexExpression = /^[0-9a-fA-F\s]+$/;
const walletAddressRegex = /^0x[a-fA-F0-9]{40}$/;
export const signUpWorkerSchema = z.object({
//   id: z.number().min(1, { message: "Id must be 1 character long" }),
  name: z.string().min(3, { message: "Name must be 3 character long" }),
  email: z.string().email("Invalid email"),
  experience: z.string(),
  skills: z.string().min(6, { message: "Provide good number of skills" }),
  walletAddress: z
    .string()
    .min(42, { message: "At least 42 characters long" })
    .max(42, { message: "At most 42 characters long" })
    .regex(walletAddressRegex,'Invalid Ethereum wallet address'),
});

export const signUpProviderSchema = z.object({
    name: z.string().min(3, { message: "Name must be 3 character long" }),
    email: z.string().email("Invalid email"),
    walletAddress: z
      .string()
      .min(42, { message: "At least 42 characters long" })
      .max(42, { message: "At most 42 characters long" })
      .regex(walletAddressRegex,'Invalid Ethereum wallet address'),
  });

