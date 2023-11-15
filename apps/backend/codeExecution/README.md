# Code Execution Service

## Description

The **Code Execution Service** is a modular microservice designed for code exceution task. It helps to create an seemless channel with Judge0 server for code execution. The Code execution API provides a RESTful interface supporting operations like complie and run code, and returns the result of the execution.

## Installation

1. Install Node 16 and above
2. Install dependencies with `yarn install`.
3. Ensure that the `.env` file is present in the root directory for local environment. For docker, it is the `.env.dev` file.

## Local Development

1. For daily development on the local environment,
Run `yarn dev`
2. For daily development on Docker,
Run `docker build -f Dockerfile.codeexec.dev .`

## Usage

Our Code Execution API provides a RESTful interface for clients to interact with the Code execution Service. It supports the following operations:
- POST /api/codeExecution/compile: Compile a code with the given data in the request body.
- GET /api/codeExecution/status/:token: Retrieve the status of the code execution by its token.