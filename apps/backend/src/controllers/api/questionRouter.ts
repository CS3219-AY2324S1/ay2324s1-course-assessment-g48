import { Router, NextFunction, Request, Response } from "express";
import Question from "../../models/question";
import logger from "../../utils/logger";

export const questionRouter = Router();

// Gets question from mongodb
questionRouter.get("/", async (req: Request, res: Response) => {
  Question.find({}).then((question) => {
    res.json(question);
  });
});

// Fetches individual question by id
questionRouter.get(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
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
    await Question.findByIdAndRemove(req.params.id)
      .then((question) => {
        if (!question) {
          res.status(404).json({
            error: `A question with id ${req.params.id} does not exist`,
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

    const isExisting = await Question.findOne({ title: body.title });

    if (isExisting) {
      res
        .status(400)
        .json({ error: "A question with this title already exists" });
      return;
    }

    const question = new Question({
      title: body.title,
      description: body.description,
      categories: body.categories,
      complexity: body.complexity,
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
    const { title, description, categories, complexity } = req.body;
    const id = req.params.id;

    await Question.findByIdAndUpdate(
      id,
      { title, description, categories, complexity },
      { new: true, runValidators: true, context: "query" }
    )
      .then((updatedQuestion) => {
        if (!updatedQuestion) {
          res
            .status(404)
            .json({ error: `A question with id ${id} does not exist` });
          return;
        }
        res.json(updatedQuestion);
      })
      .catch((err) => next(err));
  }
);
