import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisClient = createClient({
  url: redisUrl,
});

redisClient.on('connect', () => {
  console.log('Redis client connected successfully');
});

redisClient.on('reconnecting', () => {
  console.warn('Redis client reconnecting');
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

export default redisClient;
