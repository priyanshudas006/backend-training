import { Queue } from "bullmq";
import redisClient from "../config/redis";

/**
 * Student Queue
 *
 * Handles all asynchronous student operations.
 *
 * Jobs:
 * - CREATE_STUDENT
 * - UPDATE_STUDENT
 * - DELETE_STUDENT
 */
export const studentQueue = new Queue("studentQueue", {
  connection: redisClient,
  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: "exponential",
      delay: 1000,
    },

    removeOnComplete: 100,

    removeOnFail: 50,
  },
});

export default studentQueue;