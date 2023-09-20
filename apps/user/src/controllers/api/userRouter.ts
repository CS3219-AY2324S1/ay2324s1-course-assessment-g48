import { Router, Request, Response, NextFunction } from "express";
import {
  createUser,
  deleteUser,
  findOneUser,
  getAllUsers,
  updateUser,
} from "../../database/user";

export const userRouter = Router();

// Creates a new user with all attributes from `data`
userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password } = req.body;
      if (!email.length) {
        res.status(400).send({ error: "Your email cannot be blank" });
        return;
      }

      if (!password.length) {
        res.status(400).send({ error: "Your password cannot be blank" });
        return;
      }

      if (!username.length) {
        res.status(400).send({ error: "Your username cannot be blank" });
        return;
      }

      const hasSameEmailUser = await findOneUser({ email });
      if (hasSameEmailUser) {
        res.status(400).send({ error: "That email is already in use" });
        return;
      }

      const hasSameUsernameUser = await findOneUser({ username });
      if (hasSameUsernameUser) {
        res.status(400).send({ error: "That username is already in use" });
        return;
      }

      const newUser = await createUser(req.body);
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
      const { email, password } = body;
      console.log(body);
      const user = await findOneUser({
        email,
        password,
      });
      if (!user) {
        console.log("User not found");
        res.status(404).json({
          error: `Wrong email or password`,
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

// Update a user
userRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { email, username, password } = req.body;
      if (!email.length) {
        res.status(400).send({ error: "Your email cannot be blank" });
        return;
      }

      if (!password.length) {
        res.status(400).send({ error: "Your password cannot be blank" });
        return;
      }

      if (!username.length) {
        res.status(400).send({ error: "Your username cannot be blank" });
        return;
      }
      const hasSameEmailUser = await findOneUser({
        AND: [{ email }, { id: { not: Number(id) } }],
      });
      if (hasSameEmailUser) {
        res.status(400).json({
          error: "That email is already in use",
        });
        return;
      }

      const hasSameUsernameUser = await findOneUser({
        AND: [{ username }, { id: { not: Number(id) } }],
      });
      if (hasSameUsernameUser) {
        res.status(400).json({
          error: "That username is already in use",
        });
        return;
      }

      const updatedUser = await updateUser(parseInt(id), {
        email,
        username,
        password,
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
          error: `A user with id ${id} does not exist`,
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
