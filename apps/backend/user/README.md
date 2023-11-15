# User Service

## Description

In our user microservice, we have decided to use Prisma as our ORM, instead of other alternatives, such as Sequelize, TypeORM.

## Installation

1. Install Node 16 and above
2. Install dependencies with yarn install.
3. Ensure that the .env file is present in the root directory. For docker, it is the .env.dev file.

## Local Development

1. For daily development on the local environment,
   Run yarn dev
2. For daily development on Docker,
   Run docker build -f Dockerfile.users.dev.

## Usage

Our Users API provides a RESTful interface for clients to interact with the User Service. It supports the following operations:

- POST /api/users/ Create a new User with the given data in the request body.
- GET /api/users/ Retrieve a list of users
- GET /api/users/:id Retrieve a single user by its id.
- PUT /api/users/:id Update an existing users by its id with the given data in the request body.
- DELETE /api/users/:id Delete an existing user by involved user id

We also provide an option for you to declare a static JWT token for testing purposes, simply declare it as follows in the `.env` file:
```
JWT_STATIC_TOKEN=<Enter anything you want here>
```

You can simply put this token in the Authorization header, this will return you a default user for testing the Users API and other microservices endpoints. 