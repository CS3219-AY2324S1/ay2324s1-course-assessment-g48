# Question Service

## Description

The `Question Service` is a modular microservice designed for managing programming questions. It uses MongoDB and Mongoose for flexible and reliable data management. The `Question API` provides a RESTful interface supporting operations like retrieving, creating, updating, and deleting questions.

Key design considerations include MongoDB for its adaptability, Mongoose for structured interaction with MongoDB, JWT for user authentication, Joi for request validation, and custom error middleware for comprehensive error handling.

## Installation

1. Install Node 16 and above
2. Install dependencies with `yarn install`.
Important: This guide only starts the Question service. The endpoint to get user's history depends on the User service as well, so you must make sure User service is up and running.
3. Run `yarn dev`

## Usage

Our **`Question API`** provides a RESTful interface for clients to interact with the **`Question Service`**. It supports the following operations:

- **GET /questions**: Retrieve a list of questions based on query parameters, such as category, complexity, or keyword.
- **GET /questions/:id**: Retrieve a single question by its id.
- **POST /questions**: Create a new question with the given data in the request body.
- **PUT /questions/:id**: Update an existing question by its id with the given data in the request body.
- **DELETE /questions/:id**: Delete an existing question by its id.
