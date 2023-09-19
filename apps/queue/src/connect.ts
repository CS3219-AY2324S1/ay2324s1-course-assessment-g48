import { connect } from "amqplib";

export async function connectToAmpq() {
  try {
    const connection = await connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
    // Rest of the code goes here
    channel.assertQueue("easy");
    channel.assertQueue("medium");
    channel.assertQueue("hard");
    return channel;
  } catch (error) {
    console.error("Error connecting to RabbitMQ", error);
  }
}
