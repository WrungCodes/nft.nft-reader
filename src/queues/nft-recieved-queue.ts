import amqp from "amqplib";
import { uploadAsset } from "../events/upload-asset";

const queue = "nft-recieved-queue";

const nftRecievedQueue =  async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI ?? "amqp://localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      (message) => {
        if (message) {
          uploadAsset(JSON.parse(message.content.toString()))
        }
      },
      { noAck: true }
    );

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
};

export { nftRecievedQueue };
