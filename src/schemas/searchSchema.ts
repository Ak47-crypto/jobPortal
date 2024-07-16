import { z } from "zod";
const regexExpression = /^[A-Za-z\s]+$/;
export const searchSchema=z.object({
    query:z.string().regex(regexExpression,{message:"only letters are allowed"})
})



const regexExpression2 = /^[A-Za-z\s]+$/;

export const searchSchema2 = z.object({
  query: z.string().optional().refine(
    (value) => {
      if (value === undefined || value === '') {
        return true; // Allow empty string
      }
      return regexExpression2.test(value);
    },
    {
      message: "Only letters and spaces are allowed",
    }
  )
});