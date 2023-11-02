import amqp from "amqplib";

export async function produceMessage(queue: string, message: string) {
  console.log("connection starting")
  const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://192.168.50.185:5672").then((connection) => {
    console.log("Connection created")
    return connection;
  })
  const channel = await connection.createChannel().then((channel) => {
    console.log("Channel created")
    return channel;
  });

  channel.sendToQueue(queue, Buffer.from(message));
  console.log(`Producer: Message sent to ${queue}: ${message}`);

  await channel.close();
  await connection.close();
  console.log("connection closed")
}
