import amqp from "amqplib";

export async function produceMessage(queue: string, message: string) {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://peerprep-rabbitmq");
  const channel = await connection.createChannel();

  channel.sendToQueue(queue, Buffer.from(message));

  //   console.log(`Producer: Message sent to ${queue}: ${message}`);

  await channel.close();
  await connection.close();
}
