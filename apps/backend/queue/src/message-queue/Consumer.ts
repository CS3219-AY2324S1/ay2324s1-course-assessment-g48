import amqp from "amqplib";

class Consumer {
  queue: string;
  onMessage: (msg: number) => Promise<void>;
  constructor(queue: string, onMessage: (msg: number) => Promise<void>) {
    this.queue = queue;
    this.onMessage = onMessage;
    this.connectToAmqp();
  }

  private async connectToAmqp() {
    console.log("Connecting to RabbitMQ", process.env.RABBITMQ_URL);
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://localhost:5672"
    );
    const channel = await connection.createChannel();

    await channel.assertQueue(this.queue, { durable: true });

    channel.consume(this.queue, async (message) => {
      if (message != null) {
        await this.onMessage(Number(message.content.toString()));
        channel.ack(message);
      }
    });
  }
}

export default Consumer;
