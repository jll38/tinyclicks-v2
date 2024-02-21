import { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getServerSession } from "next-auth";

import { User } from "@/types/types";

import { Hasher } from "./authHandlers";

import { Prisma } from "./Prisma";
import { Redirect } from "next";
import { navigate } from "./navigate";
import { useSession } from "next-auth/react";

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    Credentials({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const user = await Prisma.getInstance().user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const hashedPassword = await Hasher.hashPassword(
          credentials.password,
          user.salt
        );

        if (user && user.password === hashedPassword) {
          const loggedInUser = new User(user.name || "", user.email, user.id);
          return loggedInUser as User;
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If the user object exists, it means a user has just signed in or up,
      // so you can encode the user's ID into the JWT token
      if (user && user.email) {
        const dbUser = await Prisma.getInstance().user.findFirst({
          where: {
            email: user.email,
          },
          select: {
            id: true,
          },
        });
        const id: String = dbUser?.id || "";
        token.id = id;
      }
      return token;
    },

    async session({ session, token }) {
      // Here, you decode the JWT token and attach the user's ID to the session object

      if (token.id && session.user) {
        //@ts-ignore {} is not assignable to string error (despite both being strings)
        session.user.id = token.id || "";
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Handle sign-in for GitHub users
      if (!account) return false;

      if (
        user.email &&
        (account?.provider === "github" || account?.provider === "google")
      ) {
        console.log(user);
        // Check if user exists in your database
        let dbUser = await Prisma.getInstance().user.findUnique({
          where: { email: user.email },
        });

        // If user doesn't exist, create them
        if (!dbUser) {
          try {
            dbUser = await Prisma.getInstance().user.create({
              data: {
                name: user.name, // Use GitHub login as name if real name is not provided
                email: user.email,
                provider: account?.provider === "github" ? "GITHUB" : "GOOGLE",
              },
            });
            console.log("dbuser");
            console.log(await dbUser);
          } catch (error) {
            throw new Error("Error signing in with Github");
          }
        } else {
          // Update existing user with possible new information
          dbUser = await Prisma.getInstance().user.update({
            where: { email: user.email },
            data: {
              name: user.name || dbUser.name,
            },
          });
        }

        // Convert dbUser to your User type if necessary, then return true to signal a successful sign-in
        return true;
      }
      return true; // Return true for other providers or credentials sign-in
    },
  },
  session: { strategy: "jwt" },
};
