import express, { NextFunction, Request, Response } from "express";
import * as userHelper from "./UserHelper";

export const userRouter = express.Router();

// Creates a new user with all attributes from `data`
userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = await userHelper.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Returns all users
userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const allUsers = await userHelper.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a user
userRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, username, password } = req.body;

    const updatedUser = await userHelper.updateUser(parseInt(id), {
      email,
      username,
      password,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a user
userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await userHelper.deleteUser(parseInt(id));

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define other routes and controllers for user operations
