# Queue Service

## Description

The **Queue Service** is a modular microservice designed for providing transmission of message using websocket. It create an seemless channel between Rabbit MQ and the Queue Service as well as client.


## Installation

1. Install Node 16 and above
2. Install dependencies with `yarn install`.
   **Important:** This guide only starts the Queue service. The endpoint to get user's queue depends on the User service as well, so you must make sure User service is up and running.
3. Ensure that the `.env` file is present in the root directory. For docker, it is the `.env.dev` file.
4. Run `docker run --rm -it -p 15672:15672 -p 5672:5672  rabbitmq:3-management` to start RabbitMQ server
    **Important:** This guide only starts the Queue service. Ensure that the RabbitMQ server is up and running.

## Local Development

1. For daily development on the local environment,
Run `yarn dev`
1. For daily development on Docker,
Run `docker build -f Dockerfile.queue.dev .`
