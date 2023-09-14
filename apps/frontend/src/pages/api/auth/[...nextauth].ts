import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "../../../database/user/entities/user.entity";
import { mockUsers } from "@/database/user/mockUsers";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    email: string;
    password: string;
  }
}

declare module "next-auth" {
  interface Session {
    id: number;
    user?: User;
  }
}

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        const users = mockUsers;
        const user = users.find(
          (user: User) =>
            user.email === credentials?.email &&
            user.password === credentials.password
        );
        if (user) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id as number;
        session.user = token.user as User;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});
