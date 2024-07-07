import { z } from "zod";
// const regexExpression = /^[A-Za-z\s]+$/;
export const jobFilterSchema=z.object({
    filter:z.string().min(3,{message:"Must be 3 characters long"})
})