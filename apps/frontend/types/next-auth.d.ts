import NextAuth from "next-auth";

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
    accessTokenExpiry?: number;
  }
}

declare module "next-auth" {
  interface Session {
    id: number;
    user?: User;
  }
}
