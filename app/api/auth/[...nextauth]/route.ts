import NextAuth from "next-auth";

const {auth, handlers, signIn, signOut} = NextAuth({
  providers: [],
});

export const {GET, POST} = handlers;
