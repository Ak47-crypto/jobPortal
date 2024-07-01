import { z } from "zod";
const regexExpression = /^[A-Za-z\s]+$/;
export const jobSchema=z.object({
    title:z.string().regex(regexExpression,{message:"only letters are allowed"}),
    description:z.string(),
    tag:z.string()
})