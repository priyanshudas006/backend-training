import { NextFunction, Request, Response } from "express";
import { redisClient } from "../config/redis";
import hashUrl from "../utils/hashUrl";

const postCache = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Cache only GET requests
  if (req.method !== "GET") {
    next();
    return;
  }

  // Save original res.json()
  const originalJson = res.json.bind(res);

  // Override res.json()
  res.json = function (body: any): Response {
    if (res.statusCode !== 200) {
      return originalJson(body);
    }

    const protocol = req.protocol;
    const host = req.get("host");

    const fullUrl = `${protocol}://${host}${req.originalUrl}`;

    const cacheKey = hashUrl(fullUrl);

    console.log("\n========== POST CACHE ==========");
    console.log("URL :", fullUrl);
    console.log("KEY :", cacheKey);

    // Save response in Redis
    (async () => {
      try {
        await redisClient.set(cacheKey, JSON.stringify(body), {
          EX: Number(process.env.REDIS_TTL) || 60,
        });

        console.log("Response Cached Successfully");
      } catch (error) {
        console.error("Post Cache Error :", error);
      }
    })();

    // Send original response
    return originalJson(body);
  };

  next();
};

export default postCache;
