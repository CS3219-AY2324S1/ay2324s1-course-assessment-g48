import { Router, NextFunction, Request, Response } from "express";
import Question from "../../models/question";
import logger from "../../utils/logger";

export const questionRouter = Router();

// Gets question from mongodb
questionRouter.get("/", async (request: Request, response: Response) => {
  Question.find({}).then((question) => {
    response.json(question);
  });
});

// Fetches individual question by id
questionRouter.get(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    logger.info(`Finding question id ${request.params.id}`);
    Question.findById(request.params.id)
      .then((question) => {
        if (question) {
          response.json(question);
        } else {
          response.status(404).end();
        }
      })
      .catch((err) => {
        // console.log(err);
        // response.status(400).send({ error: "malformatted id" });
        next(err);
      });
  }
);

// Deletes question from mongodb
questionRouter.delete("/:id", async (request: Request, response: Response) => {
  await Question.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// Adds question to mongodb
questionRouter.post("/", async (request: Request, response: Response) => {
  const body = request.body;

  const question = new Question({
    title: body.title,
    description: body.description,
    categories: body.categories,
    complexity: body.complexity,
  });
  const savedQuestion = await question.save();

  response.status(201).json(savedQuestion);
});

// Updates question in mongodb
questionRouter.put(
  "/:id",
  (request: Request, response: Response, next: NextFunction) => {
    const { title, description, categories, complexity } = request.body;
    const id = request.params.id;

    Question.findByIdAndUpdate(
      id,
      { title, description, categories, complexity },
      { new: true, runValidators: true, context: "query" }
    )
      .then((updatedQuestion) => {
        response.json(updatedQuestion);
      })
      .catch((err) => next(err));
  }
);
