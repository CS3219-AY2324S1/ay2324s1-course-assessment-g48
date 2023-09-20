import amqp from "amqplib";
import { DifficultyQueue } from "./queue/difficultyQueue";

export async function consumeMessage(difficultyQueue: DifficultyQueue) {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();

  await channel.assertQueue(difficultyQueue.nameSpace, { durable: true });

  //   console.log(`Waiting for messages in ${queue}. To exit, press CTRL+C`);

  channel.consume(difficultyQueue.nameSpace, (message) => {
    if (message != null) {
      console.log(
        `Consumer: Received message from ${
          difficultyQueue.nameSpace
        }: ${message.content.toString()}`
      );
      //   console.log(difficultyQueue);
      difficultyQueue.matchUsers(Number(message.content.toString()));
      channel.ack(message);
      console.log(JSON.stringify(difficultyQueue));
      console.log(difficultyQueue.socketMap);
    }
  });
}

console.log("HELLOOOO");
