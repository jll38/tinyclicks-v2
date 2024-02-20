import { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { getServerSession } from "next-auth";

import { User } from "@/types/types";

import { Hasher } from "./authHandlers";

import { Prisma } from "./Prisma";
import { Redirect } from "next";
import { navigate } from "./navigate";
import { useSession } from "next-auth/react";

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
  ],
};

export async function loginRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return navigate("/login");
}

export async function loginRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    if (!session) navigate("/login");
  }
}
