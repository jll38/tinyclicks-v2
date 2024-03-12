import { NextAuthOptions } from "next-auth/";

import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getServerSession } from "next-auth/next";

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
          where: { email: credentials.email, provider: "CREDENTIALS" },
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
    async jwt({ token, user, account }) {
      // Check if signing in or if an account exists (for OAuth logins)
      if (user?.email) {
        const dbUser = await Prisma.getInstance().user.findFirst({
          where: {
            email: user.email,
          },
          select: {
            id: true,
          },
        });
        if (dbUser) {
          token.userId = dbUser.id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.userId && session.user) {
        //@ts-ignore
        session.user.id = token.userId;
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

        return true;
      }
      return true; // Return true for other providers or credentials sign-in
    },
  },
  session: { strategy: "jwt" },
};
