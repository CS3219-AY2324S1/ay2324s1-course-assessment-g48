import { Request, Response, NextFunction } from "express";

import logger from "./logger";

enum ServerError {
  CAST_ERROR = "CastError",
  VALIDATION_ERROR = "ValidationError",
  JSON_WEB_TOKEN_ERROR = "JsonWebTokenError",
  TOKEN_EXPIRED_ERROR = "TokenExpiredError",
}

export const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

// Shows a 404 error for a note with unknown id
export const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.name === ServerError.CAST_ERROR) {
    return response.status(400).send({
      error: "malformatted id",
    });
  } else if (error.name === ServerError.VALIDATION_ERROR) {
    return response.status(400).json({
      error: error.message,
    });
  } else if (error.name === ServerError.JSON_WEB_TOKEN_ERROR) {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === ServerError.TOKEN_EXPIRED_ERROR) {
    return response.status(401).json({
      error: "token expired",
    });
  }

  logger.error(error.message);

  next(error);
};
