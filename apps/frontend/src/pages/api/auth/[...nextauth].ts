import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {
  CreateUserDto, User,
} from "../../../database/user/entities/user.entity";
import { createNewUser, login } from "@/database/user/userService";
import { OAuthType } from "@/utils/enums/OAuthType";
import { Role } from "@/utils/enums/Role";

declare module "next-auth" {
  interface User {
    id: number;
    username?: string;
    email?: string;
    password?: string;
    oauth?: OAuthType[];
    role?: Role;
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
        console.log("fker trying to log in with credentials", credentials)
        const user = await login({
          email: credentials?.email,
          password: credentials?.password,
        });
        console.log("fker managed to by thru", user)
        if (user) {
          console.log("User found", user);
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
<<<<<<< HEAD
=======
            oauth: [],
>>>>>>> dev
            role: user.role
          };
        } else {
          console.log("User not found nextauth");
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
  callbacks: {
    async signIn({ user, account }) {
      const OAuthErrorKey = "OAuthSigninError";
      
      try {
        if (
          !account?.provider ||
          !Object.values(OAuthType).includes(account.provider as OAuthType)
        ) {
          return true;
        }
  
        const findOAuthUser = await login({
          email: user.email,
          oauth: account.provider as OAuthType,
        });
        console.log("findOAuthUser:" , findOAuthUser)
  
        if (!findOAuthUser) {
          const newUser: CreateUserDto = {
            username: user.name as string,
            email: user.email,
            oauth: [account.provider as OAuthType],
            role: Role.Admin
          };
          const response = await createNewUser(newUser);
          console.log("Response: ", response)
          if (response.error) {
            return `/error?message=${response.error}&errorKey=${OAuthErrorKey}`;
          }
        }
        return true;
      } catch (error) {
        console.error(error);
        return true;
      }
      

    },
    async jwt({ token, trigger, session, user, account }) {
      if (
        account?.provider &&
        Object.values(OAuthType).includes(account.provider as OAuthType)
      ) {
        const findOAuthUser = await login({
          email: user.email,
          oauth: account.provider as OAuthType,
        });
        if (findOAuthUser) {
          user.id = findOAuthUser.id;
          user.username = findOAuthUser.username;
          if (findOAuthUser.password !== undefined) {
            user.password = findOAuthUser.password;
          }
          user.oauth = findOAuthUser.oauth;
          user.role = findOAuthUser.role;
        }
      }
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      if (trigger === "update") {
        if (session.user) {
          token.user = session.user;
        }
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
