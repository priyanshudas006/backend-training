import { NextFunction, Request, Response } from "express";
import { redisClient } from "../config/redis";

const postCache = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Cache only GET requests
  if (req.method !== "GET") {
    next();
    return;
  }

  const cacheKey = res.locals.cacheKey;
  const response = res.locals.response;

  if (!response) {
    next();
    return;
  }

  try {
    if (cacheKey && response.statusCode === 200) {
      await redisClient.set(
        cacheKey,
        JSON.stringify(response),
        "EX",
        Number(process.env.REDIS_TTL) || 60
      );
    }
  } catch (error) {
    console.error("Post Cache Error :", error);
  }

  res.status(response.statusCode).json(response);
};

export default postCache;
