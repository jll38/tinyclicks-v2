import { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { User } from "@/types/types";

import { Hasher } from "./authHandlers";

import { Prisma } from "./Prisma";
import { redirect } from 'next/navigation';

export const authConfig: NextAuthOptions = {
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
          const loggedInUser = new User(user.name || "", user.email, user.id)
          return loggedInUser as User;
        }
        return null;
      },
    }),
    GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    })
  ],
};
