import { Router, Request, Response, NextFunction } from "express";
import {
  OAuthType,
  createUser,
  deleteUser,
  findOneUser,
  getAllUsers,
  updateUser,
} from "../../database/user";
import { OAuth, Role } from "@prisma/client";
import logger from "../../utils/logger";
import { getJwtErrorMessage, signJwtAccessToken, signJwtRefreshToken, verifyJwtAccessToken, verifyJwtRefreshToken } from "../../utils/jwt";

export const userRouter = Router();

// Creates a new user with all attributes from `data`
userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password, oauth, role } = req.body;
      console.log("body:", req.body);
      const cleanedEmail = email?.trim();
      const cleanedUsername = username?.trim();
      const cleanedPassword = password?.trim();
      const cleanedRole = role?.trim();
      console.log("Post Body: ", req.body);

      if (!cleanedEmail?.length) {
        console.log("Email cannot be blank");
        res.status(400).send({ error: "Your email cannot be blank." });
        return;
      }

      if (!cleanedUsername?.length) {
        console.log("Username cannot be blank");
        res.status(400).send({ error: "Your username cannot be blank." });
        return;
      }

      if (oauth === undefined && !cleanedPassword?.length) {
        console.log("Password cannot be blank");
        res.status(400).send({ error: "Your password cannot be blank." });
        return;
      }

      if (!cleanedRole?.length) {
        console.log("Role cannot be blank");
        res.status(400).send({ error: "Your role cannot be blank." });
        return;
      }

      if (!Object.values(Role).includes(cleanedRole as Role)) {
        console.log(`Invalid role: ${cleanedRole}`);
        res.status(400).send({ error: `Invalid role: ${cleanedRole}` });
        return;
      }

      const hasSameEmailUser = await findOneUser({ email: cleanedEmail });
      if (hasSameEmailUser) {
        console.log("Email already in use");
        res.status(400).send({ error: "That email is already in use." });
        return;
      }

      const hasSameUsernameUser = await findOneUser({
        username: cleanedUsername,
      });
      if (hasSameUsernameUser) {
        console.log("Username already in use");
        res.status(400).send({ error: "That username is already in use." });
        return;
      }

      console.log("Still going 1");

      const cleanedOauth: OAuth[] = [];
      const invalidOauth: string[] = [];
      if (oauth !== undefined) {
        for (const auth of oauth) {
          if (!Object.values(OAuthType).includes(auth as OAuthType)) {
            invalidOauth.push(auth);
            continue;
          }
          cleanedOauth.push(auth as OAuthType);
        }
      }

      console.log("Still going 2");

      if (invalidOauth.length !== 0) {
        logger.info(
          `The following OAuths are invalid and are ignored: ${invalidOauth}`
        );
      }

      const cleanedUserData = {
        id: -1, // not used, placeholder id
        email: cleanedEmail,
        username: cleanedUsername,
        password: cleanedPassword,
        oauth: cleanedOauth,
        role: cleanedRole as Role,
      };

      console.log("Creating new user at userRouter", cleanedUserData);
      const newUser = await createUser(cleanedUserData);
      console.log("Created New user: ", newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Returns all users
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Dummy
userRouter.get(
  "/test",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ user: "test" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

userRouter.post(
  "/test",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ user: "test" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Get user by username and password
userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      console.log("body:", body);
      // TODO: hash the password
      const { email, password, oauth } = body;
      console.log("Login Body: ", body);
      const cleanedEmail = email?.trim();
      console.log("Uncleaned Password: ", password);
      const cleanedPassword = password?.trim();
      console.log("Cleaned Password: ", cleanedPassword);
      const user = await findOneUser({
        email: cleanedEmail,
      });
      console.log("User: ", user);

      if (!user) {
        console.log("User not found");
        res.status(404).json({
          error: `404: Email ${cleanedEmail} was not found, please sign up for a new account.`,
        });
        return;
      }

      if (oauth !== undefined) {
        if (Object.values(OAuthType).includes(oauth as OAuthType)) {
          // update user's oauth if user does not have specific auth
          if (!user.oauth.includes(oauth)) {
            user.oauth.push(oauth as OAuthType);
            await updateUser(user.id, {
              oauth: user.oauth,
            });
          }

          // return user
          const { password: userPassword, ...userExcludePassword } = user;
          const accessToken = signJwtAccessToken(userExcludePassword);
          const refreshToken = signJwtRefreshToken(userExcludePassword);

          res.status(200).json({ ...userExcludePassword, accessToken, refreshToken });
          return;
        }

        // oauth provided but not in enum
        console.log(`Invalid OAuth request: ${oauth}`);
        res.status(401).json({
          error: `401: ${oauth} is not supported by PeerPrep.`,
        });
        return;
      }

      if (user?.password !== cleanedPassword) {
        res.status(401).json({
          error:
            "401: Incorrect password, please try again. Password should be " +
            user?.password +
            " but is " +
            cleanedPassword +
            ".",
        });
        return;
      }
      const { password: userPassword, ...userExcludePassword } = user;
      const accessToken = signJwtAccessToken(userExcludePassword);
      const refreshToken = signJwtRefreshToken(userExcludePassword);
      res.status(200).json({ ...userExcludePassword, accessToken, refreshToken });
    } catch (error) {
      console.error("UserRouter login error:", error);
      next(error);
    }
  }
);

userRouter.get("/verifyJwt", async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  try {
    const userPayload = verifyJwtAccessToken(accessToken);
    res.status(200).json(userPayload);
  } catch (error) {
    res.status(401).json({ error: getJwtErrorMessage(error) });
    return;
  }
});

userRouter.get("/refreshJwt", async (req: Request, res: Response) => {
  const refreshToken = req.headers["refresh-token"] as string;
  if (!refreshToken) {
    res.status(401).json({ error: "Invalid access token. No refresh token provided." });
    return;
  }

  const userPayload = verifyJwtRefreshToken(refreshToken);
  if (!userPayload) {    
    res.status(401).json({ error: "Invalid refresh token." });
    return;
  }
  
  delete userPayload.iat;
  delete userPayload.exp;
  const newAccessToken = signJwtAccessToken(userPayload);
  res.status(200).json({ ...userPayload, accessToken: newAccessToken, refreshToken });
});

// Update a user
userRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const { email, username, password, oauth, role } = req.body;
      const cleanedEmail = email?.trim();
      const cleanedUsername = username?.trim();
      const cleanedPassword = password?.trim();
      const cleanedRole = role?.trim();
      let cleanedOauth: OAuth[] | undefined = undefined;

      if (cleanedEmail !== undefined) {
        const hasSameEmailUser = await findOneUser({
          AND: [{ email: cleanedEmail }, { id: { not: Number(id) } }],
        });
        if (hasSameEmailUser) {
          res.status(400).json({
            error: "That email is already in use.",
          });
          return;
        }

        if (!cleanedEmail.length) {
          res.status(400).send({ error: "Your email cannot be blank." });
          return;
        }
      }

      if (cleanedUsername !== undefined) {
        const hasSameUsernameUser = await findOneUser({
          AND: [{ username: cleanedUsername }, { id: { not: Number(id) } }],
        });
        if (hasSameUsernameUser) {
          res.status(400).json({
            error: "That username is already in use.",
          });
          return;
        }

        if (!cleanedUsername.length) {
          res.status(400).send({ error: "Your username cannot be blank." });
          return;
        }
      }

      if (cleanedPassword !== undefined && !cleanedPassword.length) {
        const user = await findOneUser({ id: Number(id) });
        if (user?.oauth.length === 0) {
          res.status(400).send({ error: "Your password cannot be blank." });
          return;
        }
      }

      if (cleanedRole !== undefined) {
        if (!cleanedRole.length) {
          res.status(400).send({ error: "Your role cannot be blank." });
          return;
        }

        if (!Object.values(Role).includes(cleanedRole as Role)) {
          res.status(400).send({ error: `Invalid role: ${cleanedRole}` });
          return;
        }
      }

      if (oauth !== undefined) {
        cleanedOauth = [];
        const invalidOauth: string[] = [];
        for (const auth of oauth) {
          if (!Object.values(OAuthType).includes(auth as OAuthType)) {
            invalidOauth.push(auth);
            continue;
          }
          cleanedOauth.push(auth as OAuthType);
        }
        if (invalidOauth.length !== 0) {
          logger.info(
            `The following OAuths are invalid and are ignored: ${invalidOauth}`
          );
        }
      }

      const updatedUser = await updateUser(parseInt(id), {
        email: cleanedEmail,
        username: cleanedUsername,
        password: cleanedPassword,
        oauth: cleanedOauth,
        role: cleanedRole as Role,
      });

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete a user
userRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedUser = await deleteUser(parseInt(id));

      if (!deletedUser) {
        res.status(404).json({
          error: `A user with id ${id} does not exist.`,
        });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Get a User
userRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await findOneUser(
        { id: Number(id) },
        { email: true, username: true, password: true }
      );
      if (!user) {
        res.status(404).json({
          error: `A user with id ${id} does not exist.`,
        });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Define other routes and controllers for user operations
