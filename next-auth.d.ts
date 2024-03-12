import { User } from "@/types/types";
declare module "next-auth" {
  /**
   * Extends the built-in session.user type
   */
  interface Session {
    user?: User;
  }

  /**
   * Extends the built-in JWT type
   */
  interface JWT {
    id?: string;
  }
}

export { User };
