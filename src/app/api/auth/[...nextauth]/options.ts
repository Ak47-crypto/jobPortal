import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import adminModel from "@/model/admin.model";
import bcrypt from "bcrypt";
export const auth0options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const admin = await adminModel.findOne({email:credentials.identifier});
          // console.log(admin,'in next db admin',credentials.password);
          if (!admin) {
            throw new Error("user not found");
          }
          
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            admin.password
          );
          console.log(isPasswordCorrect)
          if (!isPasswordCorrect) {
            throw new Error("Incorrect Credentials");
          }
          
          return admin;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user){
        // console.log(user.walletAddress,'in token')
      token.walletAddress=user.walletAddress
      }
      return token;
    },
    async session({ session, token }) {
      if(token){
        // console.log(token.walletAddress)
        session.user.walletAddress=token.walletAddress
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};