# Chat Service

## Description
The **Chat Service** is a modular microservice designed for managing programming chat rooms. It uses MongoDB and Mongoose for flexible and reliable data management. The Chat API provides a RESTful interface supporting operations like retrieving, creating and updating chat rooms.

Key design considerations include MongoDB for its adaptability, Mongoose for structured interaction with MongoDB.


## Installation

1. Install Node 16 and above
2. Install dependencies with `yarn install`.
3. Ensure that the `.env` file is present in the root directory. For docker, it is the `.env.dev` file.

## Local Development

1. For daily development on the local environment,
Run `yarn dev`
2. For daily development on Docker,
Run `docker build -f Dockerfile.chat.dev .`

## Usage

Our History API provides a RESTful interface for clients to interact with the History Service. It supports the following operations:
- POST /create-chatroom: Create a new chatroom with the given data in the request body.