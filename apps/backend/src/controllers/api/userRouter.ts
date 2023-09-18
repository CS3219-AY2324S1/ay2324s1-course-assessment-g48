import { Router, Request, Response, NextFunction } from "express";
import {
  OAuthType,
  createUser,
  deleteUser,
  findOneUser,
  getAllUsers,
  updateUser,
} from "../../database/user";
import { OAuth } from "@prisma/client";

export const userRouter = Router();

// Creates a new user with all attributes from `data`
userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password, oauth } = req.body;
      const cleanedEmail = email?.trim() as string;
      const cleanedUsername = username?.trim() as string;
      const cleanedPassword = password?.trim() as string; 

      if (!cleanedEmail.length) {
        res.status(400).send({ error: "Your email cannot be blank." });
        return;
      }

      if (!cleanedUsername.length) {
        res.status(400).send({ error: "Your username cannot be blank." });
        return;
      }

      if (oauth === undefined && !cleanedPassword.length) {
        res.status(400).send({ error: "Your password cannot be blank." });
        return;
      }

      const hasSameEmailUser = await findOneUser({ email: cleanedEmail });
      if (hasSameEmailUser) {
        res.status(400).send({ error: "That email is already in use." });
        return;
      }

      const hasSameUsernameUser = await findOneUser({ username: cleanedUsername });
      if (hasSameUsernameUser) {
        res.status(400).send({ error: "That username is already in use." });
        return;
      }

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

      if (invalidOauth.length !== 0) {
        console.warn(`The following OAuths are invalid and are ignored: ${invalidOauth}`);
      } 

      const cleanedUserData = {
        id: -1, // not used, placeholder id
        email: cleanedEmail,
        username: cleanedUsername,
        password: cleanedPassword,
        oauth: cleanedOauth
      }

      const newUser = await createUser(cleanedUserData);
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

// Get user by username and password
userRouter.get(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      // TODO: hash the password
      const { email, password, oauth } = body;
      const cleanedEmail = email?.trim();
      const cleanedPassword = password?.trim();
      const user = await findOneUser({
        email: cleanedEmail,
      });

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
              oauth: user.oauth
            });
          }
          
          // return user
          res.status(200).json(user);
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
          error: "401: Incorrect password, please try again.",
        });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Update a user
userRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { email, username, password, oauth } = req.body;
      const cleanedEmail = email?.trim();
      const cleanedUsername = username?.trim();
      const cleanedPassword = password?.trim();

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

      if (oauth === undefined && cleanedPassword !== undefined && !cleanedPassword.length) {
        res.status(400).send({ error: "Your password cannot be blank." });
        return;
      }

      const updatedUser = await updateUser(parseInt(id), {
        email: cleanedEmail,
        username: cleanedUsername,
        password: cleanedPassword,
        oauth: oauth
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

// Define other routes and controllers for user operations
