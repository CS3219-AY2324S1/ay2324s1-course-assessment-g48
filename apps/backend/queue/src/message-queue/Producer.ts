import amqp, { Connection } from "amqplib";
class Producer {
  queue: string;
  connection: any;
  channel: any;

  constructor(queue: string) {
    this.queue = queue;
    this.init();
  }

  async init() {
    //TODO: Remove hardcoded IP
    this.connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://172.32.249.58:5672"
    );
    this.channel = await this.connection.createChannel();
  }

  async produceMessage(message: string) {
    this.channel.sendToQueue(this.queue, Buffer.from(message));
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}

export default Producer;
