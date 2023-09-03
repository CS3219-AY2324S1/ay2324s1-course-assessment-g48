import express from "express";
import { createServer } from "http";

const app = express();

const server = createServer(app);

app.get("/", function (req, res) {
  console.log("HELLO");
  res.send("hello World!");
});

server.listen(8000);
