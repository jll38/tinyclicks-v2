import NextAuth from "next-auth/next";

import { authConfig } from "@/lib/auth";

//Providers
import GithubProvider from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }