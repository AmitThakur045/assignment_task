const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });

const { Queue, Worker } = require("bullmq");

const messageQueue = new Queue("message", {
  connection: process.env.REDIS_SERVER,
});

async function init({ message, chatId, type }) {
  const res = await messageQueue.add("messages between user and admin", {
    message,
    chatId,
    type,
  });

  console.log("Message added to queue", res.id);
}

const worker = new Worker("message-queue", async (job) => {
  console.log(`Message rec id: ${job.id}`);
  console.log("Processing Message");
  console.log(`Message completed: ${job.message}`);
});

module.exports = {
  init,
};
