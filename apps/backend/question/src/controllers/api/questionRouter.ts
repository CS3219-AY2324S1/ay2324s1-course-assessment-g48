import { Router, NextFunction, Request, Response } from "express";
import Question from "../../models/Question";
import logger from "../../utils/logger";
import axios from "axios";
import { Role } from "../../models/enum/Role";

export const questionRouter = Router();

// Gets question from mongodb
questionRouter.get("/", async (req: Request, res: Response) => {
  if (!Object.values(Role).includes(req.headers.role as Role)) {
    res.status(401).json({ error: "Only registered users are allowed to view questions." });
    return;
  }

  Question.find({}).then((question) => {
    res.json(question);
  });
});

questionRouter.get("/leetcode", async (req: Request, res: Response) => {
  // Remember to login before invoking this function as you need permisssions (command: firebase login)
  axios
    .get(
      "https://us-central1-cs3219-398215.cloudfunctions.net/leetcodeQuestionsFetch"
    )
    .then((response) => {
      // Handle the data from the serverless function
      console.log(response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error fetching data:", error);
    });
});

// Fetches individual question by id
questionRouter.get(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    if (!Object.values(Role).includes(req.headers.role as Role)) {
      res.status(401).json({ error: "Only registered users are allowed to view questions." });
      return;
    }

    logger.info(`Finding question id ${req.params.id}`);
    Question.findById(req.params.id)
      .then((question) => {
        if (question) {
          res.json(question);
        } else {
          res.status(404).json({
            error: `A question with id ${req.params.id} does not exist`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
);

// Deletes question from mongodb
questionRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.role !== Role.Admin) {
      res.status(401).json({ error: "Only admins are allowed to delete questions." });
      return;
    }

    await Question.findByIdAndRemove(req.params.id)
      .then((question) => {
        if (!question) {
          res.status(404).json({
            error: `A question with id ${req.params.id} does not exist.`,
          });
        }
        res.status(204).json(question);
      })
      .catch((e) => next(e));
  }
);

// Adds question to mongodb
questionRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if (req.headers.role !== Role.Admin) {
      res.status(401).json({ error: "Only admins are allowed to add questions." });
      return;
    }

    const isExisting = await Question.findOne({ title: body.title });

    if (isExisting) {
      res
        .status(400)
        .json({ error: "A question with this title already exists." });
      return;
    }

    const question = new Question({
      title: body.title,
      description: body.description,
      categories: body.categories,
      complexity: body.complexity,
      inputs: body.inputs,
      outputs: body.outputs,
      constraints: body.constraints,
      followUp: body.followUp,
      starterCode: body.starterCode,
    });
    question
      .save()
      .then((savedQuestion) => res.status(201).json(savedQuestion))
      .catch((e) => next(e));
  }
);

// Updates question in mongodb
questionRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, categories, complexity, inputs, outputs, constraints, followUp, starterCode } = req.body;
    const id = req.params.id;

    if (req.headers.role !== Role.Admin) {
      res.status(401).json({ error: "Only admins are allowed to add questions." });
      return;
    }

    await Question.findByIdAndUpdate(
      id,
      { title, description, categories, complexity, inputs, outputs, constraints, followUp, starterCode },
      { new: true, runValidators: true, context: "query" }
    )
      .then((updatedQuestion) => {
        if (!updatedQuestion) {
          res
            .status(404)
            .json({ error: `A question with id ${id} does not exist.` });
          return;
        }
        res.json(updatedQuestion);
      })
      .catch((err) => next(err));
  }
);
