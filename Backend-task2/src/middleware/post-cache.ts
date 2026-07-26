import { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis";
import { hashUrl } from "../utils/hash-url";

export const postCache = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  const cacheKey = hashUrl(fullUrl);

  const originalJson = res.json.bind(res);

  res.json = (body: any): Response => {
    redisClient
      .set(cacheKey, JSON.stringify(body))
      .then(() => {
        console.log(`Response cached with key: ${cacheKey}`);
        console.log(`data: ${body}`)
      })
      .catch((error) => {
        console.error("Redis Cache Error:", error);
      });

    return originalJson(body);
  };

  next();
};