import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "../../../database/user/entities/user.entity";
import { createNewUser, login } from "@/database/user/userService";

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
        const user = await login(credentials?.email, credentials?.password);
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      const OAuthErrorKey = "OAuthSigninError";
      if (account?.provider === 'google') {
        const findGoogleUser = await login(user.email, "google");
        if (!findGoogleUser) {
          const newUser: Omit<User, "id"> = {
            username: user.name as string,
            email: user.email as string,
            // TODO: Change this to user OAuth or something (normal, google, etc.)
            password: "google"
          };
          const response = await createNewUser(newUser);
          if (response.error) {
            return `/error?message=${response.error}&errorKey=${OAuthErrorKey}`;
          }
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google') {
        const findGoogleUser = await login(user.email, "google");
        if (findGoogleUser) {
          user.id = findGoogleUser.id;
          user.username = findGoogleUser.username;
          user.password = findGoogleUser.password;
        }
      }
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
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
});
