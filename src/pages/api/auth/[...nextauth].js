import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../../utils/db";
import User from "../../../../models/User"; // Update the path accordingly
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          await connectDB();

          const user = await User.findOne({ username: credentials.username });
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return Promise.resolve({ id: user._id, username: user.username });
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: null,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
});
