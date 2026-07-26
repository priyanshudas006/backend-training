import { NextFunction, Request, Response } from "express";
import { redisClient } from "../config/redis";
import hashUrl from "../utils/hashUrl";

const preCache = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Cache only GET requests
    if (req.method !== "GET") {
      next();
      return;
    }

    // Create Full URL
    const protocol = req.protocol;
    const host = req.get("host");

    const fullUrl = `${protocol}://${host}${req.originalUrl}`;

    // Generate Cache Key
    const cacheKey = hashUrl(fullUrl);

    console.log("\n========== PRE CACHE ==========");
    console.log("URL :", fullUrl);
    console.log("KEY :", cacheKey);

    // Check Redis
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache Hit");

      res.status(200).json(JSON.parse(cachedData));
      return;
    }

    console.log("Cache Miss");

    next();
  } catch (error) {
    console.error("Pre Cache Error :", error);

    // If Redis fails,
    // continue normally without stopping the request
    next();
  }
};

export default preCache;