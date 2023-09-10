import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "../../../components/User";
import { mockUsers } from "../../../components/MockUsers";

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
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id as number;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});