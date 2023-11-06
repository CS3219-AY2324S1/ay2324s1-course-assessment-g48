import NextAuth from "next-auth";
import { authOptions } from "./authOptions";
import { NextApiRequest, NextApiResponse } from "next";

// thanks to this guy, put here for now until better solution is found
// https://github.com/nextauthjs/next-auth/discussions/8209

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    req.method === "GET" &&
    req.url!.startsWith(`/api/auth/callback?error=`)
  ) {
    const isErrorCallback = req.query?.error && req.query?.error_description;
    if (isErrorCallback) {
      const query = req.query;
      console.error("Provider error: ", query.error);
      console.error("Provider error_description: ", query.error_description);
      res.redirect("/signin");
      return;
    }
  }

  return await NextAuth(req, res, authOptions);
}