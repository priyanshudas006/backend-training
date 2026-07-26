import { createClient } from "redis";

export const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
    console.log("Redis Connected");
});

redisClient.on("error", (err) => {
    console.error(err);
});

export async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}