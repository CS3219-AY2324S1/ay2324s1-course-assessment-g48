import NextAuth from "next-auth";
import { User } from "../../../database/user/entities/user.entity";
import { login, updateUserById } from "@/database/user/userService";
import { OAuthType } from "@/utils/enums/OAuthType";
import { Role } from "@/utils/enums/Role";
import { ErrorKey } from "@/utils/enums/ErrorKey";
import { authOptions } from "./authOptions";

declare module "next-auth" {
  interface User {
    id: number;
    username?: string;
    email?: string;
    password?: string;
    oauth?: OAuthType[];
    role?: Role;
    image?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth" {
  interface Session {
    id: number;
    user?: User;
  }
}

export default NextAuth({
  ...authOptions, 
  callbacks: {
    async signIn({ user, account }) {
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

        if (findOAuthUser) {
          updateUserById(findOAuthUser.id, {
            image: findOAuthUser.image
          })
          // if existing user is signing in with a new oauth
          if (!findOAuthUser.oauth?.includes(account.provider as OAuthType)) {
            // initialise empty oauth if existing user has no oauth previously
            findOAuthUser.oauth = findOAuthUser.oauth ?? [];
            findOAuthUser.oauth.push(account.provider as OAuthType);
            const response = await updateUserById(findOAuthUser.id, {
              oauth: findOAuthUser.oauth,
              image: user.image,
            });
            if (response.error) {
              return `/error?message=${response.error}&errorKey=${ErrorKey.OAuthSigninError}`;
            }
          }
          return true;
        }

        return `/oauthsignup?email=${user.email}&oauth=${account.provider as OAuthType}`
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
          user.accessToken = findOAuthUser.accessToken;
          user.refreshToken = findOAuthUser.refreshToken;
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
});
