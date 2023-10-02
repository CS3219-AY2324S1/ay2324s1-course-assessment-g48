import amqp from "amqplib";

export async function produceMessage(queue: string, message: string) {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://172.20.10.4:5672");
  const channel = await connection.createChannel();

  channel.sendToQueue(queue, Buffer.from(message));

  //   console.log(`Producer: Message sent to ${queue}: ${message}`);

  await channel.close();
  await connection.close();
}
