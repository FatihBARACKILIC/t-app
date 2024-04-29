import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      firstName: string;
      phoneNumber: string;
      username: string;
      lastName?: string;
    };
    tokens: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      email: string;
      firstName: string;
      phoneNumber: string;
      username: string;
      lastName?: string;
    };
    tokens: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };
  }
}
