import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redisClient = new Redis(redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: null,
});

const connectRedis = async (): Promise<void> => {
  if (redisClient.status === "wait" || redisClient.status === "end") {
    await redisClient.connect();
  }
};

redisClient.on("connect", () => {
  console.log("Redis Connected");
});

redisClient.on("reconnecting", () => {
  console.log("Redis Reconnecting...");
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

export { redisClient, connectRedis };
export default redisClient;
