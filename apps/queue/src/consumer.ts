import amqp from "amqplib";

export async function consumeMessage(queue: string) {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });

  //   console.log(`Waiting for messages in ${queue}. To exit, press CTRL+C`);

  channel.consume(queue, (message) => {
    if (message != null) {
      console.log(
        `Consumer: Received message from ${queue}: ${message.content.toString()}`
      );
      channel.ack(message);
    }
  });
}

console.log("HELLOOOO");
