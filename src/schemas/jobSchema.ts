import { z } from "zod";
const regexExpression = /^[A-Za-z\s]+$/;
export const jobSchema=z.object({
    title:z.string().regex(regexExpression,{message:"only letters are allowed"}),
    location:z.string().min(3,{message:'Must be 3 characters long'}),
    salary:z.string(),
    description:z.string().min(10,{message:'Must be 10 characters long'}),
})