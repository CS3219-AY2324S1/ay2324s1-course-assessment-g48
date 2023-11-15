# Session Service

## Description

The session microservice handles collaboration sessions for users using a HTTP express server and a WebSocket server with AutoMerge. It enables real-time document updates, session persistence and retrieval, and session creation.

## Installation

1. Install Node 16 and above
2. Install dependencies with yarn install.
   Important: This guide only starts the History service. The endpoint to get user's session depends on Chat, Question and User service as well, so you must make sure the services are up and running.
3. Ensure that the .env file is present in the root directory. For docker, it is the .env.dev file.

## Local Development

1. For daily development on the local environment,
   Run yarn dev
2. For daily development on Docker,
   Run docker build -f Dockerfile.session.dev.

## Usage

Our Session API provides a RESTful interface for clients to interact with the Session Service. It supports the following operations:

- POST /api/session/create-session: Creates a new session with the given data in the request body.
- GET /api/session/get-session/:id Retrieve a single session by its id.
