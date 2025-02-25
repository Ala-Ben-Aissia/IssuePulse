import {prisma} from "@/prisma/client";
import {PrismaAdapter} from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  auth,
  handlers: {GET, POST},
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({auth}) {
      return !!auth?.user;
      // return true;
    },
  },
  session: {
    strategy: "jwt",
    // database strategy doesn't work with OAuth providers like Google
  },
  pages: {
    signIn: "/login",
  },
});
