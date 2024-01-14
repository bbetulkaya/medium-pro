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
            const userObject = {
              id: user._id.toString(),
              username: user.username,
            };
            return Promise.resolve(userObject);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Error in authorize:", error);
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
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
