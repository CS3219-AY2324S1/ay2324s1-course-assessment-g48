# History Service

## Description

The **History Service** is a modular microservice designed for managing programming histories. It uses MongoDB and Mongoose for flexible and reliable data management. The History API provides a RESTful interface supporting operations like retrieving, creating, updating, and deleting histories.

Key design considerations include MongoDB for its adaptability, Mongoose for structured interaction with MongoDB, JWT for user authentication, Joi for request validation, and custom error middleware for comprehensive error handling.


## Installation

1. Install Node 16 and above
2. Install dependencies with `yarn install`.
   **Important:** This guide only starts the History service. The endpoint to get user's history depends on the User service as well, so you must make sure User service is up and running.
3. Ensure that the `.env` file is present in the root directory. For docker, it is the `.env.dev` file.

## Local Development
1. For daily development on the local environment,
Run `yarn dev`
2. For daily development on Docker,
Run `docker build -f Dockerfile.history.dev .`

## Usage

Our History API provides a RESTful interface for clients to interact with the History Service. It supports the following operations:
- POST /api/history: Create a new history with the given data in the request body.
- GET /api/history: Retrieve a list of histories
- GET /api/history/:id: Retrieve a single history by its id.
- PUT /api/history/:id: Update an existing history by its id with the given data in the request body.
- GET /api/history/user/:userid: Retrieve a list of histories by user id.
- GET /api/history/session/:sessionid: Retrieve a list of histories by session id.
- DELETE /api/history/:id: Delete an existing history by involved user id 