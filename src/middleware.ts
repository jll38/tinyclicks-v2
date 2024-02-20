import { withAuth } from "next-auth/middleware";
import { navigate } from "@/lib/navigate";
// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware(req) {
}, {
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/dashboard") && token === null) {
        return false;
      }
      return true;
    },
  },
});
