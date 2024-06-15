import { z } from "zod";
const regexExpression = /^[A-Za-z\s]+$/;
export const searchSchema=z.object({
    query:z.string().regex(regexExpression,{message:"only letters are allowed"})
})