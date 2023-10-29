import { login } from "@/database/user/userService";
import { OAuthType } from "@/utils/enums/OAuthType";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
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
        oauth: {
          label: "OAuth",
          type: "text",
          placeholder: "OAuth determined by user choice",
        }
      },
      authorize: async (credentials) => {
        const user = await login({
          email: credentials?.email,
          password: credentials?.password,
          oauth: credentials?.oauth as OAuthType,
        });
        if (user) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            oauth: user.oauth,
            role: user.role
          };
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // always ask for permission (can remove if prefer to just sign in immediately if signed in before)
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
}