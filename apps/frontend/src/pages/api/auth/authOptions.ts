import { login, refreshJwt, updateUserById } from "@/database/user/userService";
import { OAuthType } from "@/utils/enums/OAuthType";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions, User } from "next-auth";
import { ErrorKey } from "@/utils/enums/ErrorKey";

export const authOptions: AuthOptions = {
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
        return user ?? null;
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
  pages: {
    signIn: "/signin",
  },
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

        if (findOAuthUser) {
          // if existing user is signing in with a new oauth
          if (!findOAuthUser.oauth?.includes(account.provider as OAuthType)) {
            // initialise empty oauth if existing user has no oauth previously
            findOAuthUser.oauth = findOAuthUser.oauth ?? [];
            findOAuthUser.oauth.push(account.provider as OAuthType);
            const response = await updateUserById(findOAuthUser.id, {
              oauth: findOAuthUser.oauth,
            });
            if (response.error) {
              return `/error?message=${response.error}&errorKey=${ErrorKey.OAuthSigninError}`;
            }
          }
          return true;
        }

        return `/oauthsignup?email=${user.email}&oauth=${
          account.provider as OAuthType
        }&image=${user.image}`;
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
          user = findOAuthUser;
        }
      }
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      if (trigger === "update") {
        if (session.accessToken) {
          console.log("Expired access token successfully refreshed on API call, saving new access token...");
          (token.user as User).accessToken = session.accessToken;
          (token.user as User).accessTokenExpiry = session.accessTokenExpiry;
          console.log("New access token expiry:", session.accessTokenExpiry);
        }
        if (session.user) {
          token.user = session.user;
        }
      }
      const expiry = (token.user as User).accessTokenExpiry;
      if (expiry !== undefined && Date.now() < expiry) {
        return token;
      }
      console.log(`Access token past expiry time, attempting to refresh...`);
      console.log(`Date.now(): ${Date.now()} > Expiry: ${expiry}`);
      const response = await refreshJwt((token.user as User).refreshToken!);
      if (token.user) {
        (token.user as User).accessToken = response.accessToken;
        (token.user as User).accessTokenExpiry = response.accessTokenExpiry;
        console.log("New access token expiry:", response.accessTokenExpiry);
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
  // cookies: {
  //   sessionToken: {
  //     name: "site-session-token",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax", 
  //       path: "/",
  //       domain: ".leetpal.com",
  //     },
  //   },
  // }
}