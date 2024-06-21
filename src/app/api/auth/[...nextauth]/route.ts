import { auth0options } from "./options";
import NextAuth from "next-auth/next";

const handler = NextAuth(auth0options)

export {
    handler as GET,
    handler as POST
}