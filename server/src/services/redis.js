const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });

const Redis = require("ioredis");

const redisClient = new Redis(process.env.REDIS_SERVER);

redisClient.ping((err, result) => {
  if (err) {
    console.error("Upstash Redis connection error:", err);
  } else {
    console.log("Upstash Redis connected:", result);
  }
});

module.exports = redisClient;
