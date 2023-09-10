import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const users = [
  { id: 1, email: 'mock1@example.com', password: 'password1' },
  { id: 2, email: 'mock2@example.com', password: 'password2' },
]

declare module "next-auth" {
  interface User {
    id: number
    email: string
    password: string
  }
}

declare module "next-auth" {
  interface Session {
    id: number
  }
}

const options = {
  secret: process.env.NEXTAUTH_SECRET,
};

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
          const user = users.find(user => user.email === credentials?.email && user.password === credentials.password)
          if (user) {
            return { id: user.id, email: user.email, password: user.password }
          } else {
            return null
          }
        }
      })
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
      }
    },
  pages: {
    signIn: "/signin",
  },
});