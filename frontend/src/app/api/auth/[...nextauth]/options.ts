import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import validator from "validator";
import z from "zod";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) return null;

        const { username, password } = credentials;

        const body: Record<string, string> = { password };

        const isEmail = z.string().email().safeParse(username);
        const isPhoneNumber = z
          .string()
          .refine(validator.isMobilePhone)
          .safeParse(username);

        if (isEmail.success === true) body.email = username;
        else if (isPhoneNumber.success === true) body.phoneNumber = username;
        else body.username = username;

        const response = await fetch("http://localhost:4000/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          console.error(`${response.status} ${response.statusText}`);
          return null;
        }
        const user = await response.json();
        return user.result;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.tokens.expires_in) return token;
      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.tokens = token.tokens;
      return session;
    },
  },
};

async function refreshToken(token: JWT): Promise<JWT> {
  console.log("-----------------");
  console.log(token.tokens.access_token);
  console.log(token.tokens.refresh_token);
  console.log("-----------------");

  const response = await fetch("http://localhost:4000/refresh-key", {
    method: "POST",
    headers: {
      Authorization: `Refresh ${token.tokens.refresh_token}`,
    },
  });

  if (!response.ok) {
    console.error("error");
    console.error(`${response.status} ${response.statusText}`);
    return token;
  }

  const {
    result: { tokens },
  } = await response.json();
  return { ...token, tokens: { ...tokens } };
}
